import { Spinner } from "@/components/ui/spinner";

export default function Loading() {
  return (
    <div className="p-6 text-white flex justify-center">
      <Spinner />
    </div>
  );
}
