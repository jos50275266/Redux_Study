// This is an implementation detail
// import { sendSignalA, sendSignalB } from "./store/module";
import { turnOn } from "./store/module";

// 나중에 TurnOn 내부적으로 어떤 변화가 있던, remote.js에서 따로 처리해야할 것이 없다.
// Reducing Coupling
// 다시 말해서 remote.js는 module.js의 internal에 접근 할 수 없게 만드는 것이다.

turnOn();