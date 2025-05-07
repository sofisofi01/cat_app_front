import { UploadPage } from "@/landings/upload";
import { data } from "@/landings/upload/const";

export default async function Upload() {
  return <UploadPage {...data} />;
}
