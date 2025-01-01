import { Spinner } from "@phosphor-icons/react/dist/ssr";

export default function Loader() {
  return (
    <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center">
      <Spinner className="animate-spin text-primary" size={32} weight="bold" />
    </div>
  );
}
