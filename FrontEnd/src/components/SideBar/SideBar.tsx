'use client';

import { useState } from 'react';
import styles from './SideBar.module.scss';
import Logo from '../../assets/images/logo.svg';
import { IoSearch } from 'react-icons/io5';
import { CgMenuGridR } from 'react-icons/cg';
import { FaBell, FaStar } from 'react-icons/fa';
import { TbLogout, TbSettingsFilled } from 'react-icons/tb';
import Image from 'next/image';
import UserIcon from '@/assets/images/userImg.png';
import { FaUserLarge } from 'react-icons/fa6';

export default function SideBar() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const clickUser = () => {
    setIsModalOpen(!isModalOpen);
  };

  return (
    <div className={`w-[55] h-screen flex flex-col justify-between pt-2 pb-2 ${styles.main}`}>
      <div className={`w-[55] h-[67] flex justify-center items-center`}>
        <Logo className={`w-[35] cursor-pointer`} />
      </div>
      <div className={`w-[55] h-[890] flex flex-col justify-center items-center gap-8`}>
        <IoSearch className={`${styles.menuBtn}`} />
        <CgMenuGridR className={`${styles.menuBtn}`} />
        <FaBell className={`${styles.menuBtn} p-0.5`} />
        <FaUserLarge className={`${styles.menuBtn} p-1`} />
        <TbSettingsFilled className={`${styles.menuBtn}`} />
      </div>
      <div className={`w-[55] h-[67] flex justify-center items-center relative`}>
        <Image
          src={UserIcon}
          alt="유저아이콘"
          width={30}
          height={30}
          onClick={clickUser}
          className="cursor-pointer"
        />
      </div>

      {isModalOpen && (
        <div
          className={`absolute bottom-[10] left-[60] w-40 bg-white shadow-md rounded-md p-2 text-blue-btn border-solid border border-black/20 ${styles.modal}`}
        >
          <ul className="flex flex-col gap-2 font-bold">
            <li className="cursor-pointer hover:bg-gray-100 p-2 rounded-md flex items-center gap-2">
              <FaStar className="w-[20] h-[20]" />
              <span>My Plan</span>
            </li>
            <li className="cursor-pointer hover:bg-gray-100 p-2 rounded-md flex items-center gap-2">
              <TbSettingsFilled className="w-[20] h-[20]" />
              <span>Settings</span>
            </li>
            <li className="cursor-pointer hover:bg-gray-100 p-2 rounded-md flex items-center gap-2">
              <TbLogout className="w-[20] h-[20] ml-[2]" />
              <span>Log out</span>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
}
