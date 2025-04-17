import { AboutPage } from "@/landings/about";
import { data } from '@/landings/about/const' 

export default async function About() {
  return <AboutPage {...data}/>
}