import React from "react";

type DashboardProps = {
  inputName: string;
  handleChange: React.ChangeEventHandler<HTMLInputElement>;
};

const Dashboard = ({ inputName, handleChange }: DashboardProps): JSX.Element => {
  return (
    <React.Fragment>
      <form className="flex flex-col gap-4 bg-primary-10 text-white" onSubmit={(e) => e.preventDefault()}>
        <div>
          <label className="font-bold">Class Name</label>
          <input name={inputName} className="w-full" type="text" value={inputName} onChange={handleChange} />
        </div>
      </form>
    </React.Fragment>
  );
};

export default Dashboard;
