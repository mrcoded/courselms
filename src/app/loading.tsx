import { Loader2 } from "lucide-react";

const Loading = () => {
  return (
    <div className="flex flex-col w-full mt-24 justify-center">
      <div className="flex flex-col items-center gap-2">
        <Loader2 className="h-8 w-8 animate-spin text-zinc-500" />
        <h3 className="font-semibold text-xl">Loading...</h3>
      </div>
    </div>
  );
};

export default Loading;
