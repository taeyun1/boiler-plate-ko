const { createProxyMiddleware } = require("http-proxy-middleware");

// 프론트에서 3000번 포트로 줄때 5000번으로 서버에 주겠다.
module.exports = function (app) {
  app.use(
    "/api",
    createProxyMiddleware({
      target: "http://localhost:5000",
      changeOrigin: true,
    })
  );
};
// ▲ Proxy설정방법

// Server : localhost:5000,  Client : localhost:3000

// 서버는 포트가 5000, 클라는 3000임
// 이렇게 포트가 다른데  REQUEST(요청)을 보내면 Cors정책에 의해 막힘

// Cors정책이 왜 있냐면?? Cors : Cross-Origin Resource Sharing (CORS)

// 예를들어, 다른 웹사이트에서 우리 서버에 뭘 보내고 그러면 보안적인 문제가 생김
// 이러한 보안적인이슈 때문에  Cors정책이 있는것임

// 우리가 보는 웹이 domain-a.com 라고 하면.
// 우리가 domain-a.com 웹서버에 소통 할때는 같은 오리진(Same-Origin) 이기 때문에 항상 허용이 될수 있지만,

// 근데 domain-a.com을 보고 있는데 domain-b.com 웹서버에 소통을 한다면
// 오리진이 다르기 때문에  Cors정책에 의해 컨트롤을 당하게됨

// 이거를 해결하는 방법이 여러가지 있는데 우리는 Proxy로 해결함.

// 정리 : 서로 다른 포트의 서버와 클라이언트를 요청, 응답을 받을 수 있게 중간에서 연결해주는것

// ==============================================================================================================

// Proxy Server

// 유저 ->  Proxy Server -> 인터넷
// 유저 <- Proxy Server <- 인터넷

// 1. 예를 들어 우리 ip가 111.111.111.111이면 인터넷에 접속할때,
//    중간에 Proxy Server에서 임의로 IP를 바꿔 접근하는 사람의 IP를 모르게됨

// 2. 보내는 데이터도 Proxy Server에서 임의로 바꿀수 있음.

// - 방화벽기능, - 웹 필터기능, - 캐쉬데이터, 공유데이터 제공 기능

// 어떤 사이트에 들어갔을때 static(정적인)한 이미지들을 Proxy Server에다 저장시켜,
// 뭔가 보고싶을때 인터넷 까지 가지 않아도 Proxy Server에 담아 있는거를 빠르게 볼 수 있음.

// ==============================================================================================================

// Proxy Server 사용이유 !

// 1. 회사에서 직원들이나 집안에서 아이들 인터넷 사용 제어

// 2. 캐쉬를 이용해 더 빠른 인터넷 이용 제공

// 3. 더 나은 보안 제공

// 4. 이용 제한된 사이트 접근 가능
