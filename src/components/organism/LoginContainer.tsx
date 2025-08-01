import LoginForm from "../molecules/LoginForm";

export default function LoginContainer() {
  return (
    <section className="md:grid md:grid-cols-2 h-screen w-screen overflow-hidden">
      <div className="w-full flex justify-center items-center overflow-hidden">
        <LoginForm />
      </div>
      <div className="w-full h-full overflow-hidden">
        <img
          src="/assets/Illustrasi Login.png"
          alt="Ilustrasi Login"
          className="h-full w-full object-cover"
        />
      </div>
    </section>
  );
}
