import React, { ComponentProps, FC } from 'react';

export const combineComponents = (...components: FC<{children: JSX.Element}>[]): FC<{children: JSX.Element}> => {
  return components.reduce(
    (AccumulatedComponents, CurrentComponent) => {
      return ({ children }: ComponentProps<FC<{children: JSX.Element}>>): JSX.Element => {
        return (
          <AccumulatedComponents>
            <CurrentComponent>{children}</CurrentComponent>
          </AccumulatedComponents>
        );
      };
    },
    ({ children }) => <>{children}</>,
  );
};