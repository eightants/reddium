import TitleHead from "../components/TitleHead";
import { DOMAIN } from "../functions/constants";

const LandingPage = () => {
  return (
    <div>
      <TitleHead title="Reddium – Medium-themed Reddit client">
        <meta
          name="description"
          content="The Reddit client for Silicon Valley. "
        />
        <meta property="og:url" content={DOMAIN} />
        <meta
          property="og:description"
          content="The Reddit client for Silicon Valley. "
        />
        <meta property="og:image" content={`${DOMAIN}/reddium-mockup.png`} />
      </TitleHead>
      <div
        className="lg:mx-12 mx-auto w-full main-container py-12 sm:mx-6 flex flex-col gap-2"
        style={{ maxWidth: "560px" }}
      >
        <div className="pr-4 h-8 flex flex-row items-center cursor-pointer sm:border-0 w-full mb-8">
          <img className="h-full sm:h-6" src="reddium_symbol.svg" alt="" />
          <h1 className="ml-4 site-name text-3xl tracking-tighter sm:hidden text-black">
            Reddium
          </h1>
        </div>
        <p>Reddium has been shut down.</p>
        <p>
          Due to recent changes to the Reddit API, Reddium is no longer able to
          access most pages. If you would still like to use Reddium, you can
          fork the Github repository and host your website yourself.{" "}
        </p>
        <div className="w-full">
          <a
            href="https://github.com/eightants/reddium/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <button className="md:hidden my-4 p-1 px-3 sub-opacity-68 link-black-hover text-sm cursor-pointer max-w-full btn-outline-black rounded">
              Fork on GitHub
            </button>
          </a>
        </div>
        <p>Alternatively, check out my other applications. </p>
        <div className="flex gap-6 items-stretch my-4">
          <div className="overflow-hidden w-1/2 sm:pb-8 sm:mb-6 border border-solid border-gray-300 p-2 px-3 rounded-md hover:bg-gray-100">
            <a href="https://videorecap.viewodyssey.com/">
              <div
                className="w-full shimmer-bg rounded"
                style={{
                  backgroundImage:
                    "url(https://videorecap.viewodyssey.com/landing.png)",
                  minHeight: "150px",
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              ></div>
            </a>
            <a href="https://videorecap.viewodyssey.com/">
              <h2 className="text-xl mt-4 leading-6">
                YouTube Wrapped - Rewind Your Year on YouTube
              </h2>
              <h4 className="text-sm my-2 tracking-tight sub-opacity-54">
                View your YouTube Wrapped by visualizing your YouTube data. See
                your viewing habits and discover your top creators of the year.
              </h4>
            </a>
          </div>
          <div className="overflow-hidden w-1/2 sm:pb-8 sm:mb-6 border border-solid border-gray-300 p-2 px-3 rounded-md hover:bg-gray-100">
            <a href="https://videorecap.viewodyssey.com/?ref=reddium">
              <div
                className="w-full shimmer-bg rounded"
                style={{
                  backgroundImage:
                    "url(https://whisperify.net/assets/landing.png)",
                  minHeight: "150px",
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              ></div>
            </a>
            <a href="https://whisperify.net/?ref=reddium">
              <h2 className="text-xl mt-4 leading-6">
                Whisperify - Spotify Quiz and Music Analysis
              </h2>
              <h4 className="text-sm my-2 tracking-tight sub-opacity-54">
                An interactive way to learn about your favourite songs on
                Spotify. View stats, quiz yourself on your favourite playlists,
                and share quizzes with friends.
              </h4>
            </a>
          </div>
        </div>
        <p>
          Appreciate any donations for the past 3 years of Reddium, thanks for
          using the site!
        </p>
        <div className="w-full">
          <a
            href="https://ko-fi.com/eightants"
            target="_blank"
            rel="noopener noreferrer"
          >
            <button className="md:hidden my-4 p-1 px-3 sub-opacity-68 link-black-hover text-sm cursor-pointer max-w-full btn-outline-black rounded">
              Buy Me A Coffee
            </button>
          </a>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
