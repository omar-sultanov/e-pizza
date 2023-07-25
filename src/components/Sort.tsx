import { ISort, SortProperty, ISortValueProp } from '../models/Filter';
import React, { memo, useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { setSort } from 'redux/filter/slice';

export const sortList: ISort[] = [
  { name: 'популярности (DESC)', sortProperty: SortProperty.RATING_DESC },
  { name: 'популярности (ASC)', sortProperty: SortProperty.RATING_ASC },
  { name: 'цене (DESC)', sortProperty: SortProperty.PRICE_DESC },
  { name: 'цене (ASC)', sortProperty: SortProperty.PRICE_ASC },
  { name: 'алфавиту (DESC)', sortProperty: SortProperty.TITLE_DESC },
  { name: 'алфавиту (ASC)', sortProperty: SortProperty.TITLE_ASC },
];
export const Sort: React.FC<ISortValueProp> = memo(({ sortValue }) => {

  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const sortRef = useRef<HTMLDivElement>(null);

  const onClickListItem = (obj: ISort) => {
    dispatch(setSort(obj));
    setOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      // const _event = event as MouseEvent & {
      //   composedPath:Node[]
      // }
      if (sortRef.current && !event.composedPath().includes(sortRef.current)) {
        setOpen(false)
      }
    };
    document.body.addEventListener('click', handleClickOutside);

    return () => document.body.removeEventListener('click', handleClickOutside)

  }, []);
  return (
    <div ref={sortRef} className="sort">
      <div className="sort__label">
        <svg
          width="10"
          height="6"
          viewBox="0 0 10 6"
          fill="none"
          xmlns="http://www.w3.org/2000/svg">
          <path
            d="M10 5C10 5.16927 9.93815 5.31576 9.81445 5.43945C9.69075 5.56315 9.54427 5.625 9.375 5.625H0.625C0.455729 5.625 0.309245 5.56315 0.185547 5.43945C0.061849 5.31576 0 5.16927 0 5C0 4.83073 0.061849 4.68424 0.185547 4.56055L4.56055 0.185547C4.68424 0.061849 4.83073 0 5 0C5.16927 0 5.31576 0.061849 5.43945 0.185547L9.81445 4.56055C9.93815 4.68424 10 4.83073 10 5Z"
            fill="#2C2C2C"
          />
        </svg>
        <b>Сортировка по:</b>
        <span onClick={() => setOpen(!open)}>{sortValue.name}</span>
      </div>
      {open && (
        <div className="sort__popup">
          <ul>
            {sortList.map((obj, i) => (
              <li
                key={i}
                onClick={() => onClickListItem(obj)}
                className={
                  sortValue.sortProperty === obj.sortProperty ? 'active' : ''
                }>
                {obj.name}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
})
