import { ReactNode } from 'react';
import Button from '../button';
import { PAGINATION_DISTANCE_FROM_CURRENT_PAGE } from './constants';
import { DEFAULT_PAGINATION_SIZE } from 'src/constants/pagination';

const PaginationButton = (props: {
  page: number | ReactNode;
  activePage: number;
  disabled?: boolean;
  extraButtonProps?: (page: number) => Record<string, string>;
}) => {
  const { page, activePage, disabled, extraButtonProps } = props;
  const extraProps =
    extraButtonProps && typeof page === 'number' ? extraButtonProps(page) : {};
  return (
    <Button
      className="join-item"
      active={typeof page === 'number' && page === activePage}
      disabled={disabled}
      {...extraProps}
    >
      {page}
    </Button>
  );
};

type PaginationProps = {
  current: number;
  total: number;
  className?: string;
  extraButtonProps?: (page: number) => Record<string, string>;
  size?: number;
};
const Pagination = (props: PaginationProps) => {
  const {
    current,
    total,
    className,
    extraButtonProps,
    size = DEFAULT_PAGINATION_SIZE,
  } = props;
  const maxPage = Math.ceil(total / size);

  const getClassName = () => {
    let result = 'join';
    if (className) {
      result += ` ${className}`;
    }
    return result;
  };

  const renderArr: ReactNode[] = [];

  const minPageInActiveWindow = Math.max(
    1,
    current - PAGINATION_DISTANCE_FROM_CURRENT_PAGE,
  );
  const maxPageInActiveWindow = Math.min(
    current + PAGINATION_DISTANCE_FROM_CURRENT_PAGE,
    maxPage,
  );

  if (minPageInActiveWindow > 1) {
    renderArr.push(
      <PaginationButton
        key={`pagination-1`}
        page={1}
        activePage={current}
        extraButtonProps={extraButtonProps}
      />,
    );
    if (minPageInActiveWindow > 2) {
      renderArr.push(
        <PaginationButton
          key="pagination-first-ellipsis"
          page="..."
          activePage={current}
          disabled
        />,
      );
    }
  }
  for (let i = minPageInActiveWindow; i <= maxPageInActiveWindow; i++) {
    renderArr.push(
      <PaginationButton
        key={`pagination-${i}`}
        page={i}
        activePage={current}
        extraButtonProps={extraButtonProps}
      />,
    );
  }
  if (maxPageInActiveWindow < maxPage) {
    if (maxPageInActiveWindow < maxPage - 1) {
      renderArr.push(
        <PaginationButton
          key="pagination-second-ellipsis"
          page="..."
          activePage={current}
          disabled
        />,
      );
    }
    renderArr.push(
      <PaginationButton
        key={`pagination-${maxPage}`}
        page={maxPage}
        activePage={current}
        extraButtonProps={extraButtonProps}
      />,
    );
  }
  return <div className={getClassName()}>{renderArr}</div>;
};

export default Pagination;
