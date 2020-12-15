import { useContext } from "react";

import ViewportContext from "../context/ViewportContext"

export default function useViewport() {
  const { width, height } = useContext(ViewportContext);
  return { width, height };
}
