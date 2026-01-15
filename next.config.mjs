/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "utfs.io",
        pathname: "/f/**",
      },
      {
        protocol: "https",
        hostname: "69w1ywwoij.ufs.sh",
        pathname: "/f/**",
      },
      {
        protocol: "https",
        hostname: "uploadthing.com",
      },
    ],
  }
};

export default nextConfig;
