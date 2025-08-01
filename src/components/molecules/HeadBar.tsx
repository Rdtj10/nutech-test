import { useNavigate } from "react-router-dom";

const Menu = [
  {
    label: "Top Up",
    url: "/topup",
  },
  {
    label: "Transaction",
    url: "/transaction/history",
  },
  {
    label: "Akun",
    url: "/akun",
  },
];

const HeadBar = () => {
  const navigate = useNavigate();
  return (
    <nav className="w-screen px-36 py-6 flex justify-between items-center border-b border-gray-200 shadow-b-lg">
      <div
        className="flex justify-center gap-2 w-fit cursor-pointer"
        onClick={() => navigate("/")}
      >
        <img src="/assets/Logo.png" alt="Logo" className="w-6 mx-auto" />
        <h2 className="font-semibold">SIMS PPOB</h2>
      </div>
      <div className="flex gap-10 items-center">
        {Menu.map((menu, index) => (
          <span
            key={index}
            onClick={() => navigate(menu.url)}
            className="text-black font-semibold cursor-pointer"
          >
            {menu.label}
          </span>
        ))}
      </div>
    </nav>
  );
};

export default HeadBar;
