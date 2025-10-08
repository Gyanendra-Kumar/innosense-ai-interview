import Image from "next/image";
import SmoothPulseSVG from "../../components/animation/smoothPulse";

const AuthSidebar = () => {
  return (
    <div className="relative flex items-center justify-center min-h-[460px]">
      <Image
        src="/login-image.jpeg"
        alt="Login"
        fill
        className="object-cover brightness-90"
      />
      <div className="absolute inset-0 bg-black/20" />
      <div className="relative z-10 flex flex-col items-center text-center gap-4">
        <SmoothPulseSVG />
        <p className="text-2xl font-semibold text-white">
          InnoSense AI Interview
        </p>
      </div>
    </div>
  );
};

export default AuthSidebar;
