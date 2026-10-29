import { useTranslation } from "react-i18next";
import TranslationText from "../../TranslationText";
import { useState, useRef, useEffect } from "react";
import ReactCrop, { Crop } from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";
import {
  Box,
  Button,
  Card,
  Flex,
  Image,
  CardBody,
  Center,
  Text,
} from "@chakra-ui/react";
import DetectNodule from "../noduleHooks/DetectNodule";

interface Props {
  file: File;
  imageUrl: string;
  onCropComplete: (croppedData: string[]) => void;
}

const ImageCropping = ({ file, imageUrl, onCropComplete }: Props) => {
  const { t } = useTranslation();
  const [crop, setCrop] = useState<Crop>({
    unit: "px",
    width: 100,
    x: 0,
    y: 0,
    height: 100,
  });
  const [crops, setCrops] = useState<Crop[]>([]);
  const [completedCrop, setCompletedCrop] = useState<Crop | null>(null);
  const [croppedImages, setCroppedImages] = useState<string[]>([]);
  const imageRef = useRef<HTMLImageElement | null>(null);

  // const onImageLoaded = (image: HTMLImageElement) => {
  //   imageRef.current = image;
  // };

  const onCropChange = (crop: Crop) => {
    setCrop(crop);
  };

  const onCropCompleteHandler = (crop: Crop) => {
    setCompletedCrop(crop);
  };

  const deleteCrop = (index: number) => {
    setCroppedImages((prevCrops) => prevCrops.filter((_, i) => i !== index));
  };

  const handleDownload = () => {
    if (imageRef.current) {
      const croppedImageUrl = getCroppedImg(imageRef.current, crop);
      setCroppedImages((prevCrops) => [...prevCrops, croppedImageUrl]);
    }
  };
  onCropComplete(croppedImages);

  const getCroppedImg = (image: HTMLImageElement, crop: Crop) => {
    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d")!;

    canvas.width = crop.width;
    canvas.height = crop.height;

    ctx.drawImage(
      image,
      crop.x * scaleX,
      crop.y * scaleY,
      crop.width * scaleX,
      crop.height * scaleY,
      0,
      0,
      crop.width,
      crop.height
    );

    return canvas.toDataURL("image/jpeg");
  };

  const [isDetecting, setIsDetecting] = useState(false);
  const [detectionError, setDetectionError] = useState("");
  const handleAIDetection = () => {
    const form_data = new FormData();
    form_data.append("image", file, file.name);
    setDetectionError("");
    setIsDetecting(true);
    DetectNodule(form_data, setCrops)
      .catch((err) => {
        // 429: the backend limits the AI detections per user and minute
        setDetectionError(
          t(
            err.response?.status === 429
              ? "Too many AI detections, please wait a minute and try again"
              : "The AI detection could not be done, please try again",
          ),
        );
      })
      .finally(() => setIsDetecting(false));
  };

  useEffect(() => {
    if (crops) {
      crops.map((crop) => {
        const croppedImageUrl = getCroppedImg(imageRef.current!, crop);
        setCroppedImages((prevCrops) => [...prevCrops, croppedImageUrl]);
      });
    }
  }, [crops]);

  return (
    <Box>
      <Center>
        <ReactCrop
          crop={crop}
          onComplete={onCropCompleteHandler}
          onChange={onCropChange}
        >
          <Image src={imageUrl} ref={imageRef}></Image>
        </ReactCrop>
      </Center>
      <Box mt={4} mb={4}>
        <a><TranslationText text={"Select a crop with your mouse and click on \"Crop Image\"."} /></a>
        <Button onClick={handleDownload}><TranslationText text={"Crop Image"} /></Button>
      </Box>
      {croppedImages.length > 0 && (
        <Flex mt={4}>
          {croppedImages.map((croppedImage, index) => (
            <Card key={index} mr={4} mb={4}>
              <Image
                src={croppedImage}
                alt={`${t("Cropped")} ${index + 1}`}
                boxSize="320px"
                objectFit="contain"
                // maxW="100%"
                // maxH="120px"
              />
              <CardBody>
                <Button onClick={() => deleteCrop(index)}><TranslationText text={"Delete"} /></Button>
              </CardBody>
            </Card>
          ))}
        </Flex>
      )}
      <Button onClick={handleAIDetection} isLoading={isDetecting}><TranslationText text={"AI Detection"} /></Button>
      {detectionError && (
        <Text color="red.500" mt={2}>
          {detectionError}
        </Text>
      )}
    </Box>
  );
};

export default ImageCropping;
