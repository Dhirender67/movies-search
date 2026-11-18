import { useState } from "react";

function TextExpender() {
  return (
    <>
      <TextExpend
        expendedText="Show More"
        showLess="Show Less"
        expended={false}
        bgColor="bg-neutral-700"
        defaultShowText={20}
      >
        Lorem ipsum is the standard placeholder or dummy text used globally in
        graphic design, publishing, and web development to preview layouts and
        typography. It serves as neutral filler content, allowing designers to
        focus purely on visual structure, spacing, and formatting without being
        distracted by readable text.
      </TextExpend>
    </>
  );
}

function TextExpend({
  children,
  expendedText = "Show More",
  defaultShowText,
  showLess,
  bgColor,
  expended,
}) {
  const [textToggle, setTextToggle] = useState(expended);
  const displayText = textToggle
    ? children
    : children.split(" ").slice(0, defaultShowText).join(" ") + "... " + " ";
  console.log(displayText);

  return (
    <>
      <div className={`${bgColor}  p-4 m-4 rounded-2xl`}>
        <span>{displayText}</span>
        <button
          onClick={() => setTextToggle((toogle) => !toogle)}
          className="text-yellow-500 cursor-pointer"
        >
          {!textToggle ? expendedText : showLess}
        </button>
      </div>
    </>
  );
}

export default TextExpender;
