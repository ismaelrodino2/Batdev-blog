type PropTypes = {
  firstTxt: string;
  title: string;
};

const Header: React.FC<PropTypes> = ({ firstTxt, title }) => (
  <div className="bg-neutral flex flex-col items-center pt-[95px] px-4">
    <div className="max-w-[480px] flex text-center flex-col">
      <h6 className="mb-2">{title}</h6>
      <div className="flex flex-col items-center mb-20">
        <h1 className="leading-[1.38095em] mb-[25px]">{firstTxt}</h1>
        <hr className=" border-solid border-r-primary w-10 self-center" />
      </div>
    </div>
  </div>
);

export default Header;
