import Head from "next/head";
import bg from "../public/background.jpg";
import Image from "next/image";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { FormLabel } from "@mui/material";
import RadioGroup from "@mui/material/RadioGroup";
import Radio from "@mui/material/Radio";
import FormControlLabel from "@mui/material/FormControlLabel";
import zIndex from "@mui/material/styles/zIndex";
import supabase from "../supabase-config";

export default function Home() {
  const [fullName, setFullName] = useState("");
  const [address, setAddress] = useState("");
  const [offer, setOffer] = useState(1);
  const [province, setProvince] = useState("");
  const [number, setNumber] = useState<any>(null);
  const [nameErr, setNameErr] = useState(false);
  const [numberErr, setNumberErr] = useState(false);
  const [provinceErr, setProvinceErr] = useState(false);
  const [formErr, setFormErr] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [agents, setAgents] = useState<any>([]);
  const [agentsCount, setAgentsCount] = useState(0);
  const [previewImage, setPreviewImage] = useState("02.jpg");
  const [size, setSize] = useState("l");
  const [model, setModel] = useState(2);
  const router = useRouter();

  useEffect(() => {
    const fetchAgents = async () => {
      try {
        const { data, error } = await supabase
          .from("users")
          .select("*")
          .eq("role", "agent");

        if (data) {
          console.log("the data tracker: ", data);
          setAgents(data);
          setAgentsCount(data.length);
        }

        if (error) {
          console.log("something went wrong ", error);
        }
      } catch (error) {
        console.log("catched an error ", error);
      }
    };

    fetchAgents();
  }, []);

  const handleAddLead = async (e: any) => {
    e.preventDefault();
    if (fullName !== "" && province !== "" && address !== "" && number !== "") {
      try {
        setIsLoading(true);
        let agentId;
        if (agentsCount !== 0) {
          agentId = agents[Math.floor(Math.random() * agentsCount)].id;
        } else {
          agentId = 23;
        }
        // agentId = 23;
        let productModel;
        let productColor;
        switch (model) {
          case 1:
            productModel = "1";
            productColor = "vert";
            break;
          case 2:
            productModel = "1";
            productColor = "orange";
            break;
          case 3:
            productModel = "1";
            productColor = "marron";
            break;
          case 4:
            productModel = "1";
            productColor = "bleu";
            break;

          default:
            productModel = "1";
            productColor = "orange";
            break;
        }

        console.log("here => ", {
          first_name: fullName,
          last_name: "",
          address: "",
          phone: `${number}`,
          wilaya: province,
          commune: address,
          product: `tampon-sourcils`,
          size,
          color: productColor,
          agent_id: agentId,
          offer: `${offer}`,
        });
        const { error } = await supabase.from("leads").insert({
          first_name: fullName,
          last_name: "",
          address: "",
          phone: `${number}`,
          wilaya: province,
          commune: address,
          product: `طابع الحواجب`,
          size: "",
          color: "",
          agent_id: agentId,
          offer: `${offer}`,
        });
        if (error) {
          setFormErr(false);
        } else {
          router.push("/thankyou");
        }
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    } else {
      setFormErr(true);
    }
  };

  const handleSetError = (field: string) => {
    if (field == "name") {
      if (fullName === "") {
        setNameErr(true);
      } else {
        setNameErr(false);
      }
    } else if (field === "number") {
      if (number === null) {
        setNumberErr(true);
      } else {
        setNumberErr(false);
      }
    } else if (field === "province") {
      if (province === "") {
        setProvinceErr(true);
      } else {
        setProvinceErr(false);
      }
    }
  };
  const handleUpdateModel = (newModel: number) => {
    setModel(newModel);
    console.log(newModel);
    switch (newModel) {
      case 1:
        setPreviewImage("01.jpg");
        break;
      case 2:
        setPreviewImage("02.jpg");
        break;
      case 3:
        setPreviewImage("03.jpg");
        break;
      case 4:
        setPreviewImage("07.jpg");
        break;

      default:
        setPreviewImage("02.jpg");
        break;
    }
  };

  useEffect(() => console.log("updated", model), [model]);
  return (
    <>
      <Head>
        <title>Shopydz - Elevate your look</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta
          name="facebook-domain-verification"
          content="tymt6ktp9zw6pitsh6tylaw4fi3gns"
        />
        <link rel="icon" href="/favicon.png" />
      </Head>
      <div className="bg-auto bg-no-repeat bg-center">
        <header className="bg-[#151515] border-b border-gray-600 fixed top-0 h-20 w-full z-20">
          <div className="w-full flex justify-between px-3 py-3">
            <div className="py-3">
              <img src="logo.png" className="h-8" alt="" />
            </div>
            <div className=" mt-3">
              <a
                href="#form"
                className=" bg-orange-600 hover:bg-orange-500 duration-150 ease-in-out text-white px-6 py-3 rounded-lg font-bold"
              >
                أطلبي الآن
              </a>
            </div>
          </div>
        </header>
        <main className="w-full  mt-20 px-6 bg-[#151515]">
          <div className="w-full pt-4 pb-8 text-center  z-10 mt-4">
            <h1 className="text-5xl mb-2 text-white">
              أحصلي على حواجب مثالية خلال ثوان{" "}
            </h1>
            <h6 className="text-2xl text-white">
              {" "}
              بودرة الحواجب المتعددة الوظائف لتحديد الحواجب وملء خط الشعر{" "}
            </h6>
          </div>

          <div className="grid gap-12 md:grid-cols-2">
            <div className="w-full hidden md:block">
              {/* <div className="my-4">
                <div>
                  <img src={previewImage} alt="" className="w-full" />
                </div>
                <div className="grid gap-2 grid-cols-5 mt-2">
                  <button onClick={() => setPreviewImage("01.jpg")}>
                    <Image src="/01.jpg" width={128} height={160} />
                  </button>
                  <button onClick={() => setPreviewImage("02.jpg")}>
                    <Image src="/02.jpg" width={128} height={160} />
                  </button>
                  <button onClick={() => setPreviewImage("03.jpg")}>
                    <Image src="/03.jpg" width={128} height={160} />
                  </button>
                  <button onClick={() => setPreviewImage("07.jpg")}>
                    <Image src="/07.jpg" width={128} height={160} />
                  </button>
                </div>
              </div> */}
              <div>
                <img src="/00.webp" className="my-3" />
                <img src="/01.webp" className="my-3" />
                <img src="/02.webp" className="my-3" />
                <img src="/03.webp" className="my-3" />
                <img src="/001.webp" className="my-3" />
                <img src="/04.webp" className="my-3" />
                <img src="/05.webp" className="my-3" />
                <img src="/06.webp" className="my-3" />
                <img src="/010.webp" className="my-3" />
                <img src="/011.webp" className="my-3" />
                {/* <img src="/07.webp" className="my-3" /> */}
                {/* <img src="/08.webp" className="my-3" /> */}
                <img src="/frame-1.png" className="my-3" />
                <img src="/frame2.png" className="my-3" />
              </div>
              <div className=" text-right mt-4">
                <h1 className="text-xl mb-2 text-white">:كيفية الطلب </h1>
                <div>
                  <div className="flex text-right w-full justify-end mt-3  text-white">
                    <span> أدخلي معلوماتك الشخصية في الإستمارة أعلاه</span>
                    <span className=" h-6 w-6 text-black pt-0 pr-0 ml-3 items-center text-center rounded-full bg-white">
                      1
                    </span>
                  </div>
                  <div className="flex text-right text-white w-full justify-end mt-3">
                    <span> أنقري على أطلب الان</span>
                    <span className=" h-6 w-6 text-black pt-0 pr-0 ml-3 items-center text-center rounded-full bg-white">
                      2
                    </span>
                  </div>
                </div>
              </div>
              <div className=" text-right mt-8 mb-8">
                <h1 className="text-xl mb-2 text-white ">:كيفية الإستلام </h1>
                <p className=" text-white">
                  طريقة بسيط جدا بعد أن تطلبي المنتج سيتصل بك أحد موظفي الشركة
                  ليؤكد معك الطلب ، وسنرسل لك المنتج والدفع عند الاستلام
                </p>
              </div>
            </div>
            {/* <div className="w-full block md:hidden">
              <div className="my-4">
                <div>
                  <img src={previewImage} alt="" className="" />
                </div>
                <div className="grid gap-2 grid-cols-5 mt-2">
                  <button onClick={() => handleUpdateModel(1)}>
                    <Image src="/01.jpg" width={128} height={160} />
                  </button>
                  <button onClick={() => handleUpdateModel(2)}>
                    <Image src="/02.jpg" width={128} height={160} />
                  </button>
                  <button onClick={() => handleUpdateModel(3)}>
                    <Image src="/03.jpg" width={128} height={160} />
                  </button>
                  <button onClick={() => handleUpdateModel(4)}>
                    <Image src="/07.jpg" width={128} height={160} />
                  </button>
                </div>
              </div>
            </div> */}
            <div className="z-10">
              <div className="flex justify-between hidden">
                <Image
                  src="/arrowdown.png"
                  width={72}
                  height={72}
                  alt=""
                  className="-scale-x-100"
                />
                <Image src="/arrowdown.png" width={72} height={72} alt="" />
              </div>
              <div
                className="bg-[#282828] rounded-2xl w-fullborder-2 py-4 px-6 border-gray-700"
                id="form"
              >
                <h1 className="text-3xl  font-bold text-center text-white">
                  {/* <span className="text-orange-500">(30% تخفيض)</span> */}
                  <br /> أطلبي الآن واستفيدي من العرض{" "}
                </h1>

                <form action="#" method="post">
                  {/* <div className="p-4 border border-orange-600 rounded-lg mt-6">
                    <h3 className="text-lg mt-4 text-center text-white">
                      قومي بإختيار اللون{" "}
                    </h3>
                    <div>
                      <label className="label w-full text-right block mt-3">
                        <span className="label-text text-white ">اللون</span>
                      </label>
                      <div className="justify-end gap-1 flex-wrap flex mt-2">
                        <div
                          onClick={() => handleUpdateModel(1)}
                          className={`flex cursor-pointer p-1 border-2 hover:border-orange-500 w-16 h-16 rounded-lg ${
                            model === 1 ? "border-orange-500" : "border-gray-700"
                          }`}
                        >
                          <Image
                            src="/01.jpg"
                            className="rounded-lg"
                            width={64}
                            height={64}
                            alt=""
                          />
                        </div>
                        <div
                          onClick={() => handleUpdateModel(2)}
                          className={`flex cursor-pointer  p-1 border-2  hover:border-orange-500 w-16 h-16 rounded-lg ${
                            model === 2 ? "border-orange-500" : "border-gray-700"
                          }`}
                        >
                          <Image
                            src="/02.jpg"
                            width={64}
                            height={64}
                            alt=""
                            className="rounded-lg"
                          />
                        </div>
                        <div
                          onClick={() => handleUpdateModel(3)}
                          className={`flex cursor-pointer  p-1 border-2  hover:border-orange-500 w-16 h-16 rounded-lg ${
                            model === 3 ? "border-orange-500" : "border-gray-700"
                          }`}
                        >
                          <Image
                            src="/03.jpg"
                            width={64}
                            height={64}
                            alt=""
                            className="rounded-lg"
                          />
                        </div>
                        <div
                          onClick={() => handleUpdateModel(4)}
                          className={`flex cursor-pointer  p-1 border-2  hover:border-orange-500 w-16 h-16 rounded-lg ${
                            model === 4 ? "border-orange-500" : "border-gray-700"
                          }`}
                        >
                          <Image
                            src="/07.jpg"
                            width={64}
                            height={64}
                            alt=""
                            className="rounded-lg"
                          />
                        </div>
                      </div>
                    </div>
                    <div>
                      <label className="label w-full text-right block mt-3">
                        <span className="label-text  text-white">العرض</span>
                      </label>
                      <div className="grid grid-rows-2 gap-2 mt-2">
                        <div
                          onClick={() => setOffer(1)}
                          className={`flex p-1 border-2 text-white cursor-pointer  hover:border-orange-500  text-center justify-center rounded-lg ${
                            offer === 1 ? "border-orange-500" : "border-gray-700"
                          }`}
                        >
                          1 Ensemble (5800 DA)
                        </div>
                        <div
                          onClick={() => setOffer(2)}
                          className={`flex p-1 border-2 text-white cursor-pointer  hover:border-orange-500  text-center justify-center rounded-lg ${
                            offer === 2 ? "border-orange-500" : "border-gray-700"
                          }`}
                        >
                          2 Ensembles (9800 DA)
                        </div>
                      </div>
                    </div>
                  </div> */}

                  <h3 className="text-lg  text-center mt-4 text-white">
                    الرجاء إدخال معلوماتك الشخصية و سوف نتصل بك للتأكيد{" "}
                  </h3>
                  <div>
                    <label className="label w-full text-right block mt-3">
                      <span className="label-text  right-0 text-white">
                        الإسم و اللقب
                      </span>
                    </label>
                    <input
                      type="text"
                      className="p-3 mt-2 bg-white rounded-md w-full text-right"
                      placeholder="الإسم و اللقب"
                      value={fullName}
                      onBlur={() => handleSetError("name")}
                      required
                      onChange={(e) => setFullName(e.target.value)}
                    />
                    {nameErr && (
                      <p className="text-right text-orange-600 ">ادخل الاسم</p>
                    )}
                  </div>
                  <div>
                    <label className="label w-full text-right block mt-3">
                      <span className="label-text  text-white">رقم الهاتف</span>
                    </label>
                    <input
                      type="number"
                      className="p-3 mt-2 bg-white rounded-md w-full text-right"
                      placeholder="رقم الهاتف"
                      value={number}
                      onBlur={() => handleSetError("number")}
                      required
                      onChange={(e) => setNumber(e.target.value)}
                    />
                    {numberErr && (
                      <p className="text-right text-orange-600">
                        الرجاء إدخال رقم الهاتف
                      </p>
                    )}
                  </div>
                  <div>
                    <label className="label w-full text-right block mt-3">
                      <span className="label-text text-white ">الولاية</span>
                    </label>
                    <input
                      type="text"
                      className="p-3 mt-2 bg-white rounded-md w-full text-right"
                      placeholder="الولاية"
                      value={province}
                      onBlur={() => handleSetError("province")}
                      required
                      onChange={(e) => setProvince(e.target.value)}
                    />
                    {provinceErr && (
                      <p className="text-right text-orange-600">
                        الرجاء إدخال الولاية
                      </p>
                    )}
                  </div>
                  <div>
                    <label className="label w-full text-right block mt-3">
                      <span className="label-text text-white ">البلدية</span>
                    </label>
                    <input
                      type="text"
                      className="p-3 mt-2 bg-white rounded-md w-full text-right"
                      placeholder="البلدية"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                    />
                  </div>

                  <div>
                    <div>
                      <div className="">
                        {/* <p className=" mr-3 my-6 text-lg text-center text-white">
                          30% تخفيض
                        </p> */}
                        <p className="sm:flex block text-center mt-12 justify-center">
                          <span className="text-5xl text-orange-500 font-bold  block sm:inline">
                            {offer === 1 ? "2900" : "9800"} DA
                          </span>
                          {/* <span className=" text-white text-lg line-through block sm:inline">
                            {offer === 1 ? } DA
                          </span> */}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div>
                    {formErr && (
                      <p className="text-center  bg-orange-600/60 py-3 rounded-lg mt-4">
                        الرجاء إدخال جميع المعلومات
                      </p>
                    )}
                  </div>
                  <div className="mt-4">
                    <button
                      // disabled={!fullName || !number || !province}
                      onClick={handleAddLead}
                      disabled={isLoading}
                      type="submit"
                      className="bg-orange-600 hover:bg-orange-500 duration-150 ease-in-out text-white button-bounce text-2xl rounded-lg w-full p-4 text-center  font-bold "
                    >
                      {isLoading && <span className="loader"></span>}أطلبي الآن
                    </button>
                  </div>
                  <div className="w-full block md:hidden">
                    {fullName === "" ||
                    number === null ||
                    address === "" ||
                    province === "" ? (
                      <a
                        href="#form"
                        className="bg-orange-500 text-white fixed bottom-3 left-3 right-3 text-xl rounded-lg  p-3 text-center  font-bold hover:bg-orange-400"
                      >
                        أطلبي الآن
                      </a>
                    ) : (
                      <button
                        onClick={handleAddLead}
                        disabled={isLoading}
                        type="submit"
                        className="bg-orange-500 z-20 text-white fixed bottom-3 left-3 right-3 text-xl rounded-lg  p-3 text-center  font-bold hover:bg-orange-400"
                      >
                        {isLoading && <span className="loader"></span>}أطلبي
                        الآن
                      </button>
                    )}
                  </div>
                </form>
              </div>
            </div>
            <div className="w-full block md:hidden z-0 ">
              {/* <iframe
                // width="560"
                height="315"
                className="w-full  rounded-2xl overflow-hidden"
                src="https://www.youtube.com/embed/cB2vnyM5sEM"
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe> */}
              <div className="text-right mt-0">
                <img src="/00.webp" className="my-3" />
                <img src="/01.webp" className="my-3" />
                <img src="/02.webp" className="my-3" />
                <img src="/03.webp" className="my-3" />
                <img src="/001.webp" className="my-3" />
                <img src="/04.webp" className="my-3" />
                <img src="/05.webp" className="my-3" />
                <img src="/06.webp" className="my-3" />
                <img src="/010.webp" className="my-3" />
                <img src="/011.webp" className="my-3" />
                {/* <img src="/07.webp" className="my-3" /> */}
                {/* <img src="/08.webp" className="my-3" /> */}
                <img src="/frame-1.png" className="my-3" />
                <img src="/frame2.png" className="my-3" />
              </div>
              <div className=" text-right mt-4">
                <h1 className="text-xl mb-2 text-white">:كيفية الطلب </h1>
                <div>
                  <div className="flex text-right w-full text-white justify-end mt-3">
                    <span> أدخلي معلوماتك الشخصية في الإستمارة أعلاه</span>
                    <span className=" h-6 w-6 text-black pt-0 pr-0 ml-3 items-center text-center rounded-full bg-white">
                      1
                    </span>
                  </div>
                  <div className="flex text-right w-full text-white justify-end mt-3">
                    <span> أنقري على أطلبي الان</span>
                    <span className=" h-6 w-6 text-black pt-0 pr-0 ml-3 items-center text-center rounded-full bg-white">
                      2
                    </span>
                  </div>
                </div>
              </div>
              <div className=" text-right mt-8 mb-20">
                <h1 className="text-xl mb-2 text-white">:كيفية الإستلام </h1>
                <p className="text-white">
                  طريقة بسيط جدا بعد أن تطلب المنتج سيتصل بك أحد موظفي الشركة
                  ليؤكد معك الطلب ، وسنرسل لك المنتج والدفع عند الاستلام
                </p>
              </div>
              <div className="my-4"></div>
            </div>
          </div>

          <div></div>
        </main>
      </div>
    </>
  );
}
