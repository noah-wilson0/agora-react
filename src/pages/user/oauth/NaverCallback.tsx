// NaverCallback.tsx
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";


const NaverCallback = () => {
  const navigate = useNavigate();

  useEffect(() => {
    console.log("NaverCallback");
    console.log("window.location.href:", window.location.href);
    const code = new URL(window.location.href).searchParams.get("code");
    const state = new URL(window.location.href).searchParams.get("state");
    const savedState = localStorage.getItem('state');
    console.log("state:", state);
    console.log("savedState:", savedState);


    // state 값 검증
    if (state !== savedState) {
      alert("잘못된 접근입니다.");
      navigate("/login");
      return;
    }

    // 검증 후 localStorage에서 state 제거
    localStorage.removeItem('naver_oauth_state');

    fetch("http://localhost:8080/oauth/naver", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include", 
      body: JSON.stringify({ code, state }),
    }).then((res) => {
      if (res.ok) {
        navigate("/");
      } else {
        alert("로그인 실패: 서버 오류");
      }
    });
  }, []);

  return <div>로그인 처리 중입니다...</div>;
};

export default NaverCallback;
