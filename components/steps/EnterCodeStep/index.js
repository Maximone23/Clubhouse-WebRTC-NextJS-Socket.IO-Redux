import React from 'react';
import clsx from 'clsx';
import { useRouter } from 'next/router';
import { WhiteBlock } from '../../WhiteBlock';
import { StepInfo } from '../../StepInfo';
import { Axios } from '../../../core/axios';

import styles from './EnterPhoneStep.module.scss';
import { MainContext } from '../../../pages';

export const EnterCodeStep = () => {
  const [codes, setCodes] = React.useState(['', '', '', '']);

  const nextDisabled = codes.some((v) => !v) || codes.length < 4;

  const handleChangeInput = (e) => {
    const index = Number(e.target.getAttribute('id'));
    const value = e.target.value;
    setCodes((prev) => {
      const newArr = [...prev];
      newArr[index] = value;
      return newArr;
    });
    if (e.target.nextSibling) {
      (e.target.nextSibling).focus();
    } 
  };

console.log(codes);

  return (
    <div className={styles.block}>
      {!isLoading ? (
        <>
          <StepInfo icon="/static/numbers.png" title="Enter your activate code" />
          <WhiteBlock className={clsx('m-auto mt-30', styles.whiteBlock)}>
            <div className={styles.codeInput}>
              {codes.map((code, index) => (
                <input
                  key={index}
                  type="tel"
                  placeholder="X"
                  maxLength={1}
                  id={String(index)}
                  onChange={handleChangeInput}
                  value={code}
                />
              ))}
            </div>
          </WhiteBlock>
        </>
      ) : (
        <div className="text-center">
          <div className="loader"></div>
          <h3 className="mt-5">Activation in progress ...</h3>
        </div>
      )}
    </div>
  );
};
