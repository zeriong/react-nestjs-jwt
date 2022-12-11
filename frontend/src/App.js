import React, {useState, useRef} from "react";
import axios from "axios";

function App() {
    const [nickValue, setNickValue] = useState();
    const [jobValue, setJobValue] = useState();

    const nickOnChange = ({target: {value}}) => {
        setNickValue(value);
    };
    const jobOnChange = ({target: {value}}) => {
        setJobValue(value);
    };
    const nick = useRef();
    const job = useRef();
    const nickSubmit = (e) => {
        e.preventDefault();
        axios.post('http://localhost:3000/user',{
            "nickName": `${nick.current.value}`,
            "job": `${job.current.value}`
        })
            .then( (res) => {
                console.log(res);
            });
        setNickValue("");
        setJobValue("");
    };
    return (
        <div className="App">
            <form onSubmit={nickSubmit}
                  style={{
                      display:"flex",
                      flexDirection:"column",
                      margin:"auto",
                      width:"200px",
                  }}
            >
                <input
                    ref={nick}
                    type="text"
                    value={ nickValue || "" }
                    placeholder="닉네임을 입력해주세요."
                    onChange={nickOnChange}
                    required
                />
                <input
                    ref={job}
                    type="text"
                    value={ jobValue || "" }
                    placeholder="직업을 입력해주세요."
                    onChange={jobOnChange}
                />
                <button>확인</button>
            </form>
        </div>
    );
}

export default App;
