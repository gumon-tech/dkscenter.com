import { useRouter } from "next/router";

const Modal = ({ children }) => {
  const router = useRouter()
  return (
    <>
      <button
        onClick={() => {
          router.back()
        }}
      >
        Close modal
      </button>
      <div>{children}</div>
    </>
  )
};

export default Modal;
