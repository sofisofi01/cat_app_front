import { ThoughtsPage } from "@/landings/thoughts";
import { data } from "@/landings/thoughts/data";

export default async function About() {
  return <ThoughtsPage {...data} />;
}
