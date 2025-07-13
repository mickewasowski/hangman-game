import { BaseModal } from "./BaseModal";


//TODO: the below should have one common class InGameModal
//this class should provide the basic structure of the component:
//1. width
//2. height
//3. position
//4. backdrop


const PauseModal = () => {

  return (
  <BaseModal header={<></>} classNames="" children={<></>} />
  )
};

const WinModal = () => {

  return (
  <BaseModal header={<></>} classNames="" children={<></>} />
  )
};

const LooseModal = () => {

  return (
  <BaseModal header={<></>} classNames="" children={<></>} />
  )
};

export {
  PauseModal,
  WinModal,
  LooseModal
};
