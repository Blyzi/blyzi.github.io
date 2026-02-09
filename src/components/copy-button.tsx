interface CopyButtonProps {
  text: string;
  children: React.ReactNode;
}

export default function CopyButton({ text, children }: CopyButtonProps) {
  const handleCopy = () => {
    try {
      const parsedJson = JSON.parse(text);
      const formattedJson = JSON.stringify(parsedJson, null, 2);
      navigator.clipboard.writeText(formattedJson).then(() => {
        alert("Copied to clipboard!");
      });
    } catch {
      // If text is not valid JSON, copy it as-is
      navigator.clipboard.writeText(text).then(() => {
        alert("Copied to clipboard!");
      });
    }
  };

  return (
    <button
      onClick={handleCopy}
      className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300 transition-colors "
      type="button"
    >
      {children}
    </button>
  );
}
