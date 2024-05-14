import { ReactNode, createContext, useState } from "react";

export const TriggerUpdateCtx = createContext({
  update: false,
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  triggerUpdate: () => {},
});

export default function TriggerUpdateProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [update, setUpdate] = useState(false);

  return (
    <TriggerUpdateCtx.Provider
      value={{
        update,
        triggerUpdate: () => {
          setUpdate((prev) => !prev);
        },
      }}
    >
      {children}
    </TriggerUpdateCtx.Provider>
  );
}
