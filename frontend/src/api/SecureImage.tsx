import { Image, ImageProps } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import axios from "../libs/axios";

type Props = Omit<ImageProps, "src"> & {
  url: string;
};

export default function SecureImage({ url, ...props }: Props) {
  const [src, setSrc] = useState<string | null>(null);

  useEffect(() => {
    let objectUrl: string | null = null;
    let mounted = true;

    (async () => {
      try {
        const res = await axios.get(url, { responseType: "blob" });

        // Si no hay imagen real (blob vacío)
        if (!res.data || res.data.size === 0) return;

        objectUrl = URL.createObjectURL(res.data);
        if (mounted) setSrc(objectUrl);
      } catch (e) {
        // Si falla (404, 403, etc) no mostramos nada
        setSrc(null);
      }
    })();

    return () => {
      mounted = false;
      if (objectUrl) URL.revokeObjectURL(objectUrl);
    };
  }, [url]);

  // 👇 CLAVE: si no hay imagen, no renderiza nada
  if (!src) return null;

  return <Image {...props} src={src} />;
}