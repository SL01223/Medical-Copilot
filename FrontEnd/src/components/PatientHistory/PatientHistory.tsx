import React, { useEffect, useRef, useState } from 'react';
import styles from './PatientHistory.module.scss';
import { IoMdCloseCircleOutline } from '@react-icons/all-files/io/IoMdCloseCircleOutline';
import { FaSortDown } from '@react-icons/all-files/fa/FaSortDown';
import { fetchPatientHistory } from '@/apis/Patient';

type Props = {
  onClose?: () => void;
  isAnimate?: boolean;
};

interface PatientHistory {
  PID: string;
  sex: string;
  age: number;
  summary: string;
  memberId: string;
  recentDate: string;
}

export default function PatientHistory({ onClose, isAnimate }: Props) {
  const modalRef = useRef<HTMLDivElement>(null);
  const [patientHistories, setPatientHistories] = useState<PatientHistory[]>([]);

  const goReport = (pid: string) => {
    //(예정) 클릭한 히스토리의 pid 채팅방으로 가고, 마지막 보고서 조회하는 것 추가하기
    console.log(pid);
  };

  useEffect(() => {
    const getPatientHistory = async () => {
      const data = await fetchPatientHistory();
      if (data) {
        console.log('patient history:', data);
        setPatientHistories([{}, ...data]);
      }
    };

    getPatientHistory();
  }, []);

  useEffect(() => {
    // 모달 외부 클릭 및 터치 이벤트 핸들러
    const handleClickOutside = (event: MouseEvent | TouchEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        onClose?.();
      }
    };

    // 마우스 및 터치 이벤트 리스너 추가
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('touchstart', handleClickOutside);

    // 이벤트 리스너 제거
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
    };
  }, [onClose]);

  return (
    <div
      className={`${!isAnimate ? styles.main : styles.mainOut} flex justify-center items-center`}
    >
      <div
        ref={modalRef} // 모달을 참조에 연결
        className={`${styles.box} w-[35%] min-w-[490px] h-[90%] min-h-[400px] rounded-[20px] flex flex-col p-4 gap-3`}
      >
        <div className={`${styles.title} flex items-center justify-between`}>
          <span>Patient History</span>
          <IoMdCloseCircleOutline
            onClick={onClose}
            className="cursor-pointer"
          />
        </div>
        <div className={`${styles.table} w-full h-full flex flex-col gap-5`}>
          <div
            className={`${styles.head} grid grid-cols-[1.3fr_1fr_1fr_2fr] w-full h-[40px] min-h-[40px]`}
          >
            <div className="flex justify-center items-center gap-1">
              <span>PID</span>
              <FaSortDown className={`${styles.down}`} />
            </div>
            <span>SEX</span>
            <span>AGE</span>
            <span>Summary</span>
          </div>
          <div className={styles.content}>
            {patientHistories.map((history, index) => {
              if (index === 0) {
                return (
                  <div
                    key={index}
                    className={`${styles.body} cursor-pointer flex justify-center items-center h-[50px] min-h-[50px] rounded-[10px]`}
                    onClick={() => {
                      // router.replace("/medical/mychat");
                    }}
                  >
                    <span>Go MyChat</span>
                  </div>
                );
              }
              return (
                <div
                  key={index}
                  className={`${styles.body} cursor-pointer grid grid-cols-[1.3fr_1fr_1fr_2fr] h-[50px] min-h-[50px] rounded-[10px]`}
                  onClick={() => goReport(history.PID)}
                >
                  <span>{history.PID}</span>
                  <span>{history.sex}</span>
                  <span>{history.age}</span>
                  <span>{history.summary}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
