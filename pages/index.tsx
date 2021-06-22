import React from 'react';
import { WelcomeStep } from '../components/steps/WelcomeStep';
import { EnterNameStep } from '../components/steps/EnterNameStep';
import { GitHubStep } from '../components/steps/GitHubStep';
import { ChooseAvatarStep } from '../components/steps/ChooseAvatarStep';
import { EnterPhoneStep } from '../components/steps/EnterPhoneStep';
import { EnterCodeStep } from '../components/steps/EnterCodeStep';

const stepComponents = {
  0: WelcomeStep,
  1: GitHubStep,
  2: EnterNameStep,
  3: ChooseAvatarStep,
  4: EnterPhoneStep,
  5: EnterCodeStep,
}

interface MainContextProps {
  onNextStep: () => void;
  setUserData: React.Dispatch<React.SetStateAction<UserData>>;
  setFieldValue: (field: keyof UserData, value: string) => void;
  step: number;
  userData?: UserData;
}
export interface UserData {
  id: number;
  fullname: string;
  avatarUrl: string;
  isActive: number;
  username: string;
  phone: string;
  token?: string
}

export const MainContext = React.createContext<MainContextProps>({} as MainContextProps);



export default function Home() {
const [step, setStep] = React.useState<number>(0);
const [userData, setUserData] = React.useState<UserData>();
const Step = stepComponents[step];

const onNextStep = () => {
  setStep((prev) => prev + 1);
};

const setFieldValue = (field: string, value: string) => {
  setUserData((prev) => ({
    ...prev, 
    [field]: value,
  }))
}

  return (
    <MainContext.Provider value={{ step, onNextStep, userData, setUserData, setFieldValue}}>
      <Step />
    </MainContext.Provider>
  )
};
