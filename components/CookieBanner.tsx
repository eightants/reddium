import { useEffect, useState } from "react";

const CookieBanner = () => {
  const [seenBanner, setSeenBanner] = useState("yes");
  useEffect(() => {
    if (typeof window !== "undefined") {
      setSeenBanner(window.sessionStorage.getItem("reddiumCookieSeen") || "no");
    }
  });

  const clickBanner = () => {
    setSeenBanner("yes");
    if (typeof window !== "undefined") {
      window.sessionStorage.setItem("reddiumCookieSeen", "yes");
    }
  };

  return seenBanner == "no" ? (
    <div className="cookie-banner fixed z-10 p-3">
      <div className="px-4 py-3 about-bg flex flex-row opacity-30 text-xs items-center">
        <div>
          By using this website you agree to our use of cookies for analytics.
        </div>
        <img
          className="ml-4 w-4 opacity-25 cursor-pointer hover:opacity-75"
          src="/close.svg"
          onClick={clickBanner}
        />
      </div>
    </div>
  ) : (
    <div></div>
  );
};

export default CookieBanner;
