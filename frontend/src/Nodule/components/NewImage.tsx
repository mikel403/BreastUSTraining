import { useTranslation } from "react-i18next";
import TranslationText from "../../TranslationText";
import React, { useState } from "react";
import {
  Box,
  Input,
  Image,
  Button,
  FormLabel,
  VStack,
  Checkbox,
  Text,
  Link,
} from "@chakra-ui/react";
import ImageCropping from "./ImageCropping";
import DescribeForm from "../../Description/components/DescribeForm";
import CreateNodule from "./CreateNodule";
import { Nodule } from "../noduleHooks/NoduleInfo";
import { baseUrl, maxImageSizeMB } from "../../libs/url";
import useAuthStore from "../../store/store";
import useUser from "../../User/userHooks/useUser";

function NewImage() {
  const { i18n } = useTranslation();
  const username = useAuthStore.getState().username;
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [isFullImage, setFullImage] = useState(true);
  const [isManualCrop, setManualCrop] = useState(false);
  const [nodule, setNodule] = useState<Nodule>();
  const [cropNodules, setCropNodules] = useState<Nodule[]>([]);

  const [isPublic, setIsPublic] = useState(false);
  const [isResearch, setIsResearch] = useState(false);
  const [isDeclaration, setIsDeclaration] = useState(false);
  const [imageName, setImageName] = useState("uploaded_nodule");
  const [nameError, setNameError] = useState("");
  const [saveError, setSaveError] = useState("");
  const [fileError, setFileError] = useState("");
  // Saved stays true until the image or the crops change, so repeated clicks do not duplicate nodules
  const [isSaving, setIsSaving] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  const [file, setFile] = useState<File>();

  const { data: user } = useUser();
  const isPhysician = !!user?.is_physician;

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files && event.target.files[0];
    setFileError("");
    // Large images are rejected by the backend, so they are not loaded at all
    if (file && file.size > maxImageSizeMB * 1024 * 1024) {
      setFileError(
        i18n.t("Images can not be larger than") + " " + maxImageSizeMB + " MB",
      );
      event.target.value = "";
      return;
    }
    if (file) {
      setFile(file);
      setIsSaved(false);
      const reader = new FileReader();

      reader.onload = (e) => {
        const dataUrl = e.target?.result as string | null;
        setImageUrl(dataUrl || null);
      };

      reader.readAsDataURL(file);
    }
  };

  const [croppedImageUrl, setcroppedImageUrl] = useState<string[]>([]);

  const handleCropComplete = (croppedData: string[]) => {
    setcroppedImageUrl(croppedData);
    setIsSaved(false);
  };

  const handleReadyToDescribe = () => {
    if (!imageName.trim()) {
      setNameError(i18n.t("Please enter an image name"));
      return;
    }
    setNameError("");
    setSaveError("");
    if (username === "TestUser" || isSaving || isSaved) return;

    const cleanImageName = imageName.trim();
    const uploads: Promise<void>[] = [];

    if (isFullImage && file) {
      uploads.push(CreateNodule(
        file,
        isPublic,
        isResearch,
        isDeclaration,
        cleanImageName,
        setNodule,
      ));
    } else if (isManualCrop && croppedImageUrl.length > 0 && file) {
      croppedImageUrl.forEach((image, index) => {
        // Name shown/stored in your database
        const noduleName =
          croppedImageUrl.length > 1
            ? `${cleanImageName}_${index + 1}`
            : cleanImageName;

        // File name used internally for the uploaded crop
        const originalExtension = file.name.includes(".")
          ? file.name.substring(file.name.lastIndexOf("."))
          : ".png";

        const imageFile = base64toFile(
          image,
          `${noduleName}${originalExtension}`,
        );

        const setCropNodule = (nodule: Nodule) =>
          setCropNodules((prevNod) => [...prevNod, nodule]);

        if (imageFile) {
          uploads.push(CreateNodule(
            imageFile,
            isPublic,
            isResearch,
            isDeclaration,
            noduleName,
            undefined,
            setCropNodule,
          ));
        }
      });
    }
    if (uploads.length === 0) return;
    setIsSaving(true);
    Promise.all(uploads)
      .then(() => setIsSaved(true))
      .catch((err) => {
        // The backend rejects sharing without the declaration or without a radiologist profile
        const detail =
          err.response?.data?.declaration?.[0] ?? err.response?.data?.image?.[0];
        setSaveError(
          i18n.t(detail ?? "The image could not be saved, please try again"),
        );
      })
      .finally(() => setIsSaving(false));
  };
  function base64toFile(base64Data: string, filename: string): File | null {
    const byteCharacters = atob(base64Data.split(",")[1]);
    const byteArray = new Uint8Array(byteCharacters.length);

    for (let i = 0; i < byteCharacters.length; i++) {
      byteArray[i] = byteCharacters.charCodeAt(i);
    }

    return new File([byteArray], filename, { type: "image/png" });
  }
  return (
    <>
      <Box mt={4} mb={4}>
        <Text mb={3}>
          <TranslationText text={"Uploaded images are private by default and are only accessible to you. They will not be used for any purpose, including research or public sharing, without your explicit consent."} /> </Text>

        <FormLabel mb={2}>
          <TranslationText text={"If you would like to make your images public or allow them to be used for research purposes, please select one or both of the options below. If you select either option, you must confirm that you have the necessary permissions."} /> </FormLabel>
        <VStack align="start" spacing={3}>
          <Checkbox
            isChecked={isPublic}
            onChange={(e) => {
              setIsPublic(e.target.checked);
              // The declaration has to be confirmed again for the new choice
              if (!e.target.checked) setIsDeclaration(false);
            }}
            isDisabled={!isPhysician}
          >
            <TranslationText text={"Make uploaded images publicly available"} /> </Checkbox>

          <Checkbox
            isChecked={isResearch}
            onChange={(e) => {
              setIsResearch(e.target.checked);
              if (!e.target.checked) setIsDeclaration(false);
            }}
            isDisabled={!isPhysician}
          >
            <TranslationText text={"Allow uploaded images to be used for research purposes"} /> </Checkbox>
          <Checkbox
            isChecked={isDeclaration}
            onChange={(e) => setIsDeclaration(e.target.checked)}
            isDisabled={!isPhysician || !(isPublic || isResearch)}
          >
            <TranslationText text={"I confirm that I have the necessary permissions to share these images and, if required, can provide the information needed to allow their removal upon request."} /> </Checkbox>
        </VStack>
        {!isPhysician && (
          <Text fontSize="sm" color="red" mt={2}>
            <TranslationText text={"Only users with a radiologist profile can enable these options. If you want a radiologist profile contact"} />{" "}
            <Link href="mailto:mcarrilero@dia.uned.es" color="red">
              mcarrilero@dia.uned.es
            </Link>
            .
          </Text>
        )}
      </Box>
      <Box p={4}>
        <a>
          <strong><TranslationText text={"Upload an image."} /></strong> <TranslationText text={"The image will not be saved on this step."} /> </a>
        <Input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          mt={4}
          mb={4}
        />
        {fileError && (
          <Text color="red.500" mb={2}>
            {fileError}
          </Text>
        )}
        {file && (
          <Box>
            <div>
              <a>
                <strong>
                  <TranslationText text={"You can choose to use the whole image or select one or more regions of interest."} /> </strong>
                <br />
                <TranslationText text={"By default, \"Use the whole image\" is selected, if you wish to continue you can click on \"Save and describe\" below. If you need to crop the image, click on \"Select regions of interest\". An AI model is available to speed up the process. It is important to consider the tumour enviroment, so the region captures descriptors such as the posterior features."} /> </a>
            </div>
            <Box display="flex" justifyContent="space-between">
              <Button
                mt={4}
                isDisabled={isFullImage}
                onClick={() => {
                  setFullImage(true);
                  setManualCrop(false);
                  setIsSaved(false);
                }}
                id="normalbutton"
              >
                <TranslationText text={"Use the whole image"} /> </Button>
              <Button
                mt={4}
                mb={4}
                isDisabled={isManualCrop}
                onClick={() => {
                  setFullImage(false);
                  setManualCrop(true);
                  setIsSaved(false);
                }}
                id="normalbutton"
              >
                <TranslationText text={"Select regions of interest"} /> </Button>
            </Box>
          </Box>
        )}
        <Box display="flex" justifyContent="center">
          {imageUrl && isFullImage && <Image src={imageUrl} />}

          {imageUrl && isManualCrop && (
            <ImageCropping
              file={file!}
              imageUrl={imageUrl}
              onCropComplete={handleCropComplete}
            />
          )}
        </Box>
      </Box>
      {imageUrl && (
        <Box>
          <a>
            <TranslationText text={"If you click on \"Save and Describe\" only the crops (if you have chosen to do so) or the image will be saved to your database. This means that you can crop the image to cut out patient information. Be careful,"} />{" "}
            <strong><TranslationText text={"do not save images with personal information!"} /></strong>
          </a>
          <Text mb={2}>
            <TranslationText text={"Please provide a name for the image. If multiple crops are created, they will be saved as"} /> <strong>name_1, name_2, ...</strong>
          </Text>

          <Input
            placeholder={i18n.t("Enter image name")}
            value={imageName}
            onChange={(e) => setImageName(e.target.value)}
            mb={3}
          />
          {nameError && (
            <Text color="red.500" mb={2}>
              {nameError}
            </Text>
          )}
          {username == "TestUser" && (
            <div className="text-danger">
              <TranslationText text={"As a test user the image will not be saved"} /> </div>
          )}
          <Button
            mt={3}
            mb={5}
            onClick={handleReadyToDescribe}
            isLoading={isSaving}
            isDisabled={isSaved}
          >
            <TranslationText text={"Save and Describe"} /> </Button>
          {saveError && (
            <Text color="red.500" mb={2}>
              {saveError}
            </Text>
          )}
          {nodule && (
            <Box>
              {isFullImage && (
                <DescribeForm
                  id={nodule.id}
                  image={null}
                  full_image={null}
                  isPublic={false}
                />
              )}
            </Box>
          )}
          {cropNodules && (
            <Box>
              {isManualCrop && (
                <Box>
                  {cropNodules.map((cropNodule) => (
                    <DescribeForm
                      key={cropNodule.id}
                      id={cropNodule.id}
                      image={baseUrl + cropNodule.private_image_url}
                      full_image={null}
                      isPublic={false}
                    />
                  ))}
                </Box>
              )}
            </Box>
          )}
        </Box>
      )}
    </>
  );
}

export default NewImage;
