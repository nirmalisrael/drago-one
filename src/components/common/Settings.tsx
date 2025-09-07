// In your Settings.tsx or wherever you want the theme switcher

import { MainCard } from "@/components/ui/cards/MainCard";
import { ThemeSettings } from "@/components/ui/ThemeSettings";

const Settings = () => {
  return (
    <MainCard title="Application Settings">
      <ThemeSettings />
    </MainCard>
  );
};

export default Settings;