export default function LoadingMessage({
  message = 'Loading...',
}: {
  message?: string;
}) {
  return (
    <p className="text-center mt-section text-muted text-label">
      {message}
    </p>
  );
}