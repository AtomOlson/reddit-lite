import React from "react";

export async function loadUrl(url) {
  const response = await fetch(url);
  const json = await response.json();

  return json;

}