const Policy = () => {
  return (
    <div className="text-xs text-muted-foreground text-center text-balance">
      By clicking continue, you agree to our{" "}
      <a href="#" className="auth-link after:!h-[1px]">
        Term of Service
      </a>{" "}
      and{" "}
      <a href="#" className="auth-link after:!h-[1px]">
        Privacy Policy
      </a>
    </div>
  );
};

export default Policy;
