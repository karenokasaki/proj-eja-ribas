import React from "react";
import { CloudinaryContext, Image } from "cloudinary-react";
import { DocumentIcon } from "@heroicons/react/24/outline";

function PDFViewer({ url }) {
  const version = url.match(/v\d+/)[0];
  const publicId = url.split("/").slice(-1)[0].split(".")[0];

  console.log(publicId);
  console.log("version", version);

  return (
    <div>
      <CloudinaryContext cloudName="du8u5jhdz">
        <a
          href={`https://res.cloudinary.com/du8u5jhdz/image/upload/${version}/eja-ribas/${publicId}.pdf`}
          download
          target="_blank"
          rel="noopener noreferrer"
        >
          <DocumentIcon className="h-12 w-12" />
        </a>
      </CloudinaryContext>
    </div>
  );
}

export default PDFViewer;
