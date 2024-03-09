import Profile from "./Profile";
import Heading from "../Heading/Heading";
import SubHeading from "../SubHeading/SubHeading";

function SettingsPage() {
  return (
    <div>
      <Heading title="SETTINGS" />
      <SubHeading subtitle=" No need for drama llama, alpaca the bags" />
      <Profile />
    </div>
  );
}

export default SettingsPage;
