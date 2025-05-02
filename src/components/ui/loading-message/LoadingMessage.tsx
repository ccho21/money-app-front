export default function LoadingMessage({
  text = 'Loading...',
}: {
  text?: string;
}) {
  return (
    <p className="text-center mt-section text-muted text-label">
      {text}
    </p>
  );
}