// NaverCallback.tsx
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";


const NaverCallback = () => {
  const navigate = useNavigate();

  useEffect(() => {
    console.log("KakaoCallback");
    console.log("window.location.href:", window.location.href);
    const code = new URL(window.location.href).searchParams.get("code");

    // 검증 후 localStorage에서 state 제거
    localStorage.removeItem('naver_oauth_state');

    fetch("http://localhost:8080/oauth/kakao", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include", 
      body: JSON.stringify({ code }),
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
