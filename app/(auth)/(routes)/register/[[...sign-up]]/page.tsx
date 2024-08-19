import { SignUp, UserButton } from "@clerk/nextjs";

export default function page() {
  return (
    <>
      <SignUp />;
      <UserButton />;
    </>
  );
}
