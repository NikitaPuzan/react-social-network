import React, {useEffect, useState} from 'react';
import style from "./Paginator.module.css";
import {Button} from "@mui/material";

const Paginator = ({pageSize, onPageChanged, currentPage, totalUsersCount, ...props}) => {

  let pagesCount = Math.ceil(totalUsersCount / pageSize)

  let pages = []
  for (let i = 1; i <= pagesCount; i++) {
    pages.push(i)
  }

  let sectionSize = 10
  let sectionCount = Math.ceil(pagesCount / sectionSize)
  let [sectionNumber, setSectionNumber] = useState(1)
  let leftSectionPageNumber = (sectionNumber - 1) * sectionSize + 1
  let rightSectionPageNumber = sectionNumber * sectionSize

  useEffect(() =>
    setSectionNumber(Math.ceil(currentPage / sectionSize)),
    [currentPage]);

  return (
    <div className={style.pagination}>
      {sectionNumber > 1 &&
        <Button onClick={() => {
          setSectionNumber(sectionNumber - 1)
        }}>Prev</Button>}
      {sectionNumber === 1 &&
        <Button disabled>Prev</Button>}
      {
        pages
          .filter(page => page >= leftSectionPageNumber && page <= rightSectionPageNumber)
          .map(page => {
            return <span className={page === currentPage && style.selectedPage}
                         onClick={() => {
                           onPageChanged(page)
                         }}>   {page}   </span>
          })}
      {sectionCount > sectionNumber &&
        <Button onClick={() => {
          setSectionNumber(sectionNumber + 1)
        }}>Next</Button>}
    </div>
  );
};

export default Paginator;
