import React from "react";
import { IoSearchOutline } from "react-icons/io5";
import { FaRegEdit } from "react-icons/fa";
import { FaRegTrashAlt } from "react-icons/fa";
import { MdBlock } from "react-icons/md";
import { IoMdTime } from "react-icons/io";
import { RiMessage2Line } from "react-icons/ri";
interface IconProps {
  size?: number;
  color?: string;
}


export const SearchIcon: React.FC<IconProps> = (props) => (
  <IoSearchOutline {...props} />
);
export const EditIcon: React.FC<IconProps> = (props) => <FaRegEdit  {...props} />;
export const TimeIcon: React.FC<IconProps> = (props) => <IoMdTime {...props} />;
export const TrashIcon:React.FC<IconProps> = () => <FaRegTrashAlt />;
export const BlockIcon: React.FC<IconProps> = () => <MdBlock />;
export const MessageIcon: React.FC<IconProps> = (props) => <RiMessage2Line {...props} />
