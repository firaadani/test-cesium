import React, { useState, useEffect } from "react";
import {
  Ion,
  Cartesian3,
  Math as CesiumMath,
  BoundingSphere,
  HeadingPitchRange,
} from "cesium";
import {
  Viewer,
  Entity,
  CameraFlyToBoundingSphere,
  KmlDataSource,
  BillboardGraphics,
} from "resium";

import "./style.css";

import API from "../services";

import CheckboxLabel from "./CheckboxLabel";
import EntityBuilder from "./EntityBuilder";

import { url } from "../services/Config";

const Resium = () => {
  Ion.defaultAccessToken =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiI1YTcyNDBmMC04ZjA3LTQwODgtOTQ4Yy01ZDc1ODRmOTg1ODUiLCJpZCI6Njc5MTAsImlhdCI6MTYzMjE5NDA2NH0.pC83HtMjyDvMy_Zr9zmMOc_7wmwIa0vyJbHmatCcHfc";
  const location = window.location.href;
  let splitPath = location.split("%22");
  let kode = splitPath[1];

  // =========== DATA LAMA =============
  // state per titik
  const [titikLokasi, settitikLokasi] = useState({ lat: "", long: "" });
  const [photosOfLandToBeBuilt, setphotosOfLandToBeBuilt] = useState({
    lat: "",
    long: "",
  });
  const [layoutSite, setlayoutSite] = useState({ lat: "", long: "" });
  const [fotoSisiBarat, setfotoSisiBarat] = useState({ lat: "", long: "" });
  const [fotoSisiSelatan, setfotoSisiSelatan] = useState({ lat: "", long: "" });
  const [fotoSisiTimur, setfotoSisiTimur] = useState({ lat: "", long: "" });
  const [fotoSisiUtara, setfotoSisiUtara] = useState({ lat: "", long: "" });
  const [gambarLahan, setgambarLahan] = useState({ lat: "", long: "" });
  const [makingGPS, setMakingGPS] = useState({ lat: "", long: "" });
  const [gnet05, setgnet05] = useState({ lat: "", long: "" });
  const [gnet5, setgnet5] = useState({ lat: "", long: "" });
  const [roadRoute, setroadRoute] = useState({ lat: "", long: "" });
  const [locationMapping, setlocationMapping] = useState({ lat: "", long: "" });
  const [sector0, setsector0] = useState({ lat: "", long: "" });
  const [sector45, setsector45] = useState({ lat: "", long: "" });
  const [sector90, setsector90] = useState({ lat: "", long: "" });
  const [sector135, setsector135] = useState({ lat: "", long: "" });
  const [sector180, setsector180] = useState({ lat: "", long: "" });
  const [sector225, setsector225] = useState({ lat: "", long: "" });
  const [sector270, setsector270] = useState({ lat: "", long: "" });
  const [sector315, setsector315] = useState({ lat: "", long: "" });
  const [site1, setsite1] = useState({ lat: "", long: "" });
  const [site2, setsite2] = useState({ lat: "", long: "" });
  const [site3, setsite3] = useState({ lat: "", long: "" });
  const [site4, setsite4] = useState({ lat: "", long: "" });

  // state untuk show/hide masing2 titik
  const [showTitikLokasi, setshowTitikLokasi] = useState(false);
  const [showphotosOfLandToBeBuilt, setshowphotosOfLandToBeBuilt] =
    useState(false);
  const [showlayoutSite, setshowlayoutSite] = useState(false);
  const [showfotoSisiBarat, setshowfotoSisiBarat] = useState(false);
  const [showfotoSisiSelatan, setshowfotoSisiSelatan] = useState(false);
  const [showfotoSisiTimur, setshowfotoSisiTimur] = useState(false);
  const [showfotoSisiUtara, setshowfotoSisiUtara] = useState(false);
  const [showGambarLahan, setshowGambarLahan] = useState(false);
  const [showMakingGPS, setshowMakingGPS] = useState(false);
  const [showgnet05, setshowgnet05] = useState(false);
  const [showgnet5, setshowgnet5] = useState(false);
  const [showroadRoute, setshowroadRoute] = useState(false);
  const [showlocationMapping, setshowlocationMapping] = useState(false);
  const [showsector0, setshowsector0] = useState(false);
  const [showsector45, setshowsector45] = useState(false);
  const [showsector90, setshowsector90] = useState(false);
  const [showsector135, setshowsector135] = useState(false);
  const [showsector180, setshowsector180] = useState(false);
  const [showsector225, setshowsector225] = useState(false);
  const [showsector270, setshowsector270] = useState(false);
  const [showsector315, setshowsector315] = useState(false);
  const [showsite1, setshowsite1] = useState(false);
  const [showsite2, setshowsite2] = useState(false);
  const [showsite3, setshowsite3] = useState(false);
  const [showsite4, setshowsite4] = useState(false);

  const [dataPerCode, setDataPerCode] = useState("");
  const [showPoints, setShowPoints] = useState(false);

  const [showBuildings, setShowBuildings] = useState(false);
  const [showKML1, setshowKML1] = useState(false);
  const [showKML2, setshowKML2] = useState(false);

  // =========== DATA BATCH 2 =============
  // state per titik
  const [titikLokasi2, setTitikLokasi2] = useState({
    lat: "",
    long: "",
    show: false,
  });
  const [towerData, settowerData] = useState({
    lat: "",
    long: "",
    show: false,
  });
  const [lahanYangAkanDibangun, setlahanYangAkanDibangun] = useState({
    lat: "",
    long: "",
    show: false,
  });
  const [layoutSite2, setlayoutSite2] = useState({
    lat: "",
    long: "",
    show: false,
  });
  const [tower, settower] = useState({ lat: "", long: "", show: false });
  const [denahLokasiArea, setdenahLokasiArea] = useState({
    lat: "",
    long: "",
    show: false,
  });
  const [lahanKandidat, setlahanKandidat] = useState({
    lat: "",
    long: "",
    show: false,
  });
  const [markingGPS, setmarkingGPS] = useState({
    lat: "",
    long: "",
    show: false,
  });
  const [obstacle0, setobstacle0] = useState({
    lat: "",
    long: "",
    show: false,
  });
  const [obstacle45, setobstacle45] = useState({
    lat: "",
    long: "",
    show: false,
  });
  const [obstacle90, setobstacle90] = useState({
    lat: "",
    long: "",
    show: false,
  });
  const [obstacle135, setobstacle135] = useState({
    lat: "",
    long: "",
    show: false,
  });
  const [obstacle180, setobstacle180] = useState({
    lat: "",
    long: "",
    show: false,
  });
  const [obstacle225, setobstacle225] = useState({
    lat: "",
    long: "",
    show: false,
  });
  const [obstacle270, setobstacle270] = useState({
    lat: "",
    long: "",
    show: false,
  });
  const [obstacle315, setobstacle315] = useState({
    lat: "",
    long: "",
    show: false,
  });
  const [gnet05deg0, setgnet05deg0] = useState({
    lat: "",
    long: "",
    show: false,
  });
  const [gnet05deg30, setgnet05deg30] = useState({
    lat: "",
    long: "",
    show: false,
  });
  const [gnet05deg60, setgnet05deg60] = useState({
    lat: "",
    long: "",
    show: false,
  });
  const [gnet05deg90, setgnet05deg90] = useState({
    lat: "",
    long: "",
    show: false,
  });
  const [gnet05deg120, setgnet05deg120] = useState({
    lat: "",
    long: "",
    show: false,
  });
  const [gnet05deg150, setgnet05deg150] = useState({
    lat: "",
    long: "",
    show: false,
  });
  const [gnet05deg180, setgnet05deg180] = useState({
    lat: "",
    long: "",
    show: false,
  });
  const [gnet05deg210, setgnet05deg210] = useState({
    lat: "",
    long: "",
    show: false,
  });
  const [gnet05deg240, setgnet05deg240] = useState({
    lat: "",
    long: "",
    show: false,
  });
  const [gnet05deg270, setgnet05deg270] = useState({
    lat: "",
    long: "",
    show: false,
  });
  const [gnet05deg300, setgnet05deg300] = useState({
    lat: "",
    long: "",
    show: false,
  });
  const [gnet05deg330, setgnet05deg330] = useState({
    lat: "",
    long: "",
    show: false,
  });
  const [gnet2deg0, setgnet2deg0] = useState({
    lat: "",
    long: "",
    show: false,
  });
  const [gnet2deg30, setgnet2deg30] = useState({
    lat: "",
    long: "",
    show: false,
  });
  const [gnet2deg60, setgnet2deg60] = useState({
    lat: "",
    long: "",
    show: false,
  });
  const [gnet2deg90, setgnet2deg90] = useState({
    lat: "",
    long: "",
    show: false,
  });
  const [gnet2deg120, setgnet2deg120] = useState({
    lat: "",
    long: "",
    show: false,
  });
  const [gnet2deg150, setgnet2deg150] = useState({
    lat: "",
    long: "",
    show: false,
  });
  const [gnet2deg180, setgnet2deg180] = useState({
    lat: "",
    long: "",
    show: false,
  });
  const [gnet2deg210, setgnet2deg210] = useState({
    lat: "",
    long: "",
    show: false,
  });
  const [gnet2deg240, setgnet2deg240] = useState({
    lat: "",
    long: "",
    show: false,
  });
  const [gnet2deg270, setgnet2deg270] = useState({
    lat: "",
    long: "",
    show: false,
  });
  const [gnet2deg300, setgnet2deg300] = useState({
    lat: "",
    long: "",
    show: false,
  });
  const [gnet2deg330, setgnet2deg330] = useState({
    lat: "",
    long: "",
    show: false,
  });
  const [kandidat1, setkandidat1] = useState({
    lat: "",
    long: "",
    show: false,
  });
  const [kandidat2, setkandidat2] = useState({
    lat: "",
    long: "",
    show: false,
  });
  const [penggunaPotensial1, setpenggunaPotensial1] = useState({
    lat: "",
    long: "",
    show: false,
  });
  const [penggunaPotensial2, setpenggunaPotensial2] = useState({
    lat: "",
    long: "",
    show: false,
  });
  const [penggunaPotensial3, setpenggunaPotensial3] = useState({
    lat: "",
    long: "",
    show: false,
  });
  const [penggunaPotensial4, setpenggunaPotensial4] = useState({
    lat: "",
    long: "",
    show: false,
  });
  const [penggunaPotensial5, setpenggunaPotensial5] = useState({
    lat: "",
    long: "",
    show: false,
  });
  const [penggunaPotensial6, setpenggunaPotensial6] = useState({
    lat: "",
    long: "",
    show: false,
  });
  const [penggunaPotensial7, setpenggunaPotensial7] = useState({
    lat: "",
    long: "",
    show: false,
  });
  const [penggunaPotensial8, setpenggunaPotensial8] = useState({
    lat: "",
    long: "",
    show: false,
  });
  const [penggunaPotensial9, setpenggunaPotensial9] = useState({
    lat: "",
    long: "",
    show: false,
  });
  const [penggunaPotensial10, setpenggunaPotensial10] = useState({
    lat: "",
    long: "",
    show: false,
  });
  const [penggunaPotensial11, setpenggunaPotensial11] = useState({
    lat: "",
    long: "",
    show: false,
  });
  const [penggunaPotensial12, setpenggunaPotensial12] = useState({
    lat: "",
    long: "",
    show: false,
  });
  const [penggunaPotensial13, setpenggunaPotensial13] = useState({
    lat: "",
    long: "",
    show: false,
  });
  const [penggunaPotensial14, setpenggunaPotensial14] = useState({
    lat: "",
    long: "",
    show: false,
  });
  const [penggunaPotensial15, setpenggunaPotensial15] = useState({
    lat: "",
    long: "",
    show: false,
  });
  const [aksesSite1, setaksesSite1] = useState({
    lat: "",
    long: "",
    show: false,
  });
  const [aksesSite2, setaksesSite2] = useState({
    lat: "",
    long: "",
    show: false,
  });
  const [aksesSite3, setaksesSite3] = useState({
    lat: "",
    long: "",
    show: false,
  });
  const [aksesSite4, setaksesSite4] = useState({
    lat: "",
    long: "",
    show: false,
  });
  const [pathProfile, setpathProfile] = useState({
    lat: "",
    long: "",
    show: false,
  });
  const [desktopContour, setdesktopContour] = useState({
    lat: "",
    long: "",
    show: false,
  });
  const [GPSSiteA, setGPSSiteA] = useState({ lat: "", long: "", show: false });
  const [GPSSiteB, setGPSSiteB] = useState({ lat: "", long: "", show: false });
  const [towerSiteA, settowerSiteA] = useState({
    lat: "",
    long: "",
    show: false,
  });
  const [lokasiAntennaMWSiteA, setlokasiAntennaMWSiteA] = useState({
    lat: "",
    long: "",
    show: false,
  });
  const [panoramicSiteA, setpanoramicSiteA] = useState({
    lat: "",
    long: "",
    show: false,
  });
  const [towerSiteB, settowerSiteB] = useState({
    lat: "",
    long: "",
    show: false,
  });
  const [lokasiAntennaMWSiteB, setlokasiAntennaMWSiteB] = useState({
    lat: "",
    long: "",
    show: false,
  });
  const [panoramicSiteB, setpanoramicSiteB] = useState({
    lat: "",
    long: "",
    show: false,
  });
  const [AkeBTanpaZoom, setAkeBTanpaZoom] = useState({
    lat: "",
    long: "",
    show: false,
  });
  const [AkeBDenganZoom, setAkeBDenganZoom] = useState({
    lat: "",
    long: "",
    show: false,
  });
  const [BkeATanpaZoom, setBkeATanpaZoom] = useState({
    lat: "",
    long: "",
    show: false,
  });
  const [BkeADenganZoom, setBkeADenganZoom] = useState({
    lat: "",
    long: "",
    show: false,
  });
  const [pathProfileMW, setpathProfileMW] = useState({
    lat: "",
    long: "",
    show: false,
  });
  const [petaLokasiKeseluruhan, setpetaLokasiKeseluruhan] = useState({
    lat: "",
    long: "",
    show: false,
  });
  const [titikTerminasiDiPOI, settitikTerminasiDiPOI] = useState({
    lat: "",
    long: "",
    show: false,
  });
  const [ruteFiberOptik, setruteFiberOptik] = useState({
    lat: "",
    long: "",
    show: false,
  });
  const [asPlanDrawing, setasPlanDrawing] = useState({
    lat: "",
    long: "",
    show: false,
  });

  useEffect(() => {
    let formData = new FormData();
    formData.append("kode_survei", kode);
    API.getSurveyBTSbyKode(formData)
      .then((res) => {
        console.log(
          "console log nya res",
          res?.data?.values[0]?.data[res?.data?.values[0]?.data.length - 1]
        );
        // setDataPerCode(
        //   res?.data?.values[0]?.data[res?.data?.values[0]?.data.length - 1]
        // );
        setDataPerCode(res?.data?.values[0]?.data[0]);
      })
      .then(() => {})
      .catch((err) => console.log(err?.response));
  }, []);

  console.log("console log nya dataPerCode", dataPerCode);
  console.log("console log nya titikLokasi2", titikLokasi2);
  console.log("console log nya towerData", towerData);

  useEffect(() => {
    if (dataPerCode?.batch && dataPerCode?.batch === "Batch 2") {
      //do something
      setTitikLokasi2({
        ...titikLokasi2,
        lat: parseFloat(dataPerCode?.page2?.latitude),
        long: parseFloat(dataPerCode?.page2?.longitude),
      });
      settowerData({
        ...towerData,
        lat: parseFloat(dataPerCode?.page3?.koordinatgpswgs84latitude),
        long: parseFloat(dataPerCode?.page3?.koordinatgpswgs84longitude),
      });
      setlahanYangAkanDibangun({
        ...lahanYangAkanDibangun,
        lat: parseFloat(
          dataPerCode?.page11?.latitude !== ""
            ? dataPerCode?.page11?.latitude
            : dataPerCode?.page3?.koordinatgpswgs84latitude
        ),
        long: parseFloat(
          dataPerCode?.page11?.longitude !== ""
            ? dataPerCode?.page11?.longitude
            : dataPerCode?.page3?.koordinatgpswgs84longitude
        ),
      });
      setlayoutSite2({
        ...layoutSite2,
        lat: parseFloat(
          dataPerCode?.page12?.latitudelayoutsite !== ""
            ? dataPerCode?.page12?.latitudelayoutsite
            : dataPerCode?.page3?.koordinatgpswgs84latitude
        ),
        long: parseFloat(
          dataPerCode?.page12?.longitudelayoutsite !== ""
            ? dataPerCode?.page12?.longitudelayoutsite
            : dataPerCode?.page3?.koordinatgpswgs84longitude
        ),
      });
      settower({
        ...tower,
        lat: parseFloat(
          dataPerCode?.page12?.latitudetower !== ""
            ? dataPerCode?.page12?.latitudetower
            : dataPerCode?.page3?.koordinatgpswgs84latitude
        ),
        long: parseFloat(
          dataPerCode?.page12?.longitudetower !== ""
            ? dataPerCode?.page12?.longitudetower
            : dataPerCode?.page3?.koordinatgpswgs84longitude
        ),
      });
      setdenahLokasiArea({
        ...denahLokasiArea,
        lat: parseFloat(
          dataPerCode?.page12?.latitudedenahlokasiarea !== ""
            ? dataPerCode?.page12?.latitudedenahlokasiarea
            : dataPerCode?.page3?.koordinatgpswgs84latitude
        ),
        long: parseFloat(
          dataPerCode?.page12?.longitudedenahlokasiarea !== ""
            ? dataPerCode?.page12?.longitudedenahlokasiarea
            : dataPerCode?.page3?.koordinatgpswgs84longitude
        ),
      });
      setlahanKandidat({
        ...lahanKandidat,
        lat: parseFloat(
          dataPerCode?.page13?.latitudelahankandidat !== ""
            ? dataPerCode?.page13?.latitudelahankandidat
            : dataPerCode?.page3?.koordinatgpswgs84latitude
        ),
        long: parseFloat(
          dataPerCode?.page13?.longitudelahankandidat !== ""
            ? dataPerCode?.page13?.longitudelahankandidat
            : dataPerCode?.page3?.koordinatgpswgs84longitude
        ),
      });
      setmarkingGPS({
        ...markingGPS,
        lat: parseFloat(
          dataPerCode?.page13?.latitudemarkinggps !== ""
            ? dataPerCode?.page13?.latitudemarkinggps
            : dataPerCode?.page3?.koordinatgpswgs84latitude
        ),
        long: parseFloat(
          dataPerCode?.page13?.longitudemarkinggps !== ""
            ? dataPerCode?.page13?.longitudemarkinggps
            : dataPerCode?.page3?.koordinatgpswgs84longitude
        ),
      });
      setobstacle0({
        ...obstacle0,
        lat: parseFloat(dataPerCode?.page3?.koordinatgpswgs84latitude),
        long: parseFloat(dataPerCode?.page3?.koordinatgpswgs84longitude),
      });
      setobstacle45({
        ...obstacle45,
        lat: parseFloat(dataPerCode?.page3?.koordinatgpswgs84latitude),
        long: parseFloat(dataPerCode?.page3?.koordinatgpswgs84longitude),
      });
      setobstacle90({
        ...obstacle90,
        lat: parseFloat(dataPerCode?.page3?.koordinatgpswgs84latitude),
        long: parseFloat(dataPerCode?.page3?.koordinatgpswgs84longitude),
      });
      setobstacle135({
        ...obstacle135,
        lat: parseFloat(dataPerCode?.page3?.koordinatgpswgs84latitude),
        long: parseFloat(dataPerCode?.page3?.koordinatgpswgs84longitude),
      });
      setobstacle180({
        ...obstacle180,
        lat: parseFloat(dataPerCode?.page3?.koordinatgpswgs84latitude),
        long: parseFloat(dataPerCode?.page3?.koordinatgpswgs84longitude),
      });
      setobstacle225({
        ...obstacle225,
        lat: parseFloat(dataPerCode?.page3?.koordinatgpswgs84latitude),
        long: parseFloat(dataPerCode?.page3?.koordinatgpswgs84longitude),
      });
      setobstacle270({
        ...obstacle270,
        lat: parseFloat(dataPerCode?.page3?.koordinatgpswgs84latitude),
        long: parseFloat(dataPerCode?.page3?.koordinatgpswgs84longitude),
      });
      setobstacle315({
        ...obstacle315,
        lat: parseFloat(dataPerCode?.page3?.koordinatgpswgs84latitude),
        long: parseFloat(dataPerCode?.page3?.koordinatgpswgs84longitude),
      });
      setgnet05deg0({
        ...gnet05deg0,
        lat: parseFloat(dataPerCode?.page15?.latitude0),
        long: parseFloat(dataPerCode?.page15?.longitude0),
      });
      setgnet05deg30({
        ...gnet05deg30,
        lat: parseFloat(dataPerCode?.page15?.latitude30),
        long: parseFloat(dataPerCode?.page15?.longitude30),
      });
      setgnet05deg60({
        ...gnet05deg60,
        lat: parseFloat(dataPerCode?.page15?.latitude60),
        long: parseFloat(dataPerCode?.page15?.longitude60),
      });
      setgnet05deg90({
        ...gnet05deg90,
        lat: parseFloat(dataPerCode?.page15?.latitude90),
        long: parseFloat(dataPerCode?.page15?.longitude90),
      });
      setgnet05deg120({
        ...gnet05deg120,
        lat: parseFloat(dataPerCode?.page15?.latitude120),
        long: parseFloat(dataPerCode?.page15?.longitude120),
      });
      setgnet05deg150({
        ...gnet05deg150,
        lat: parseFloat(dataPerCode?.page15?.latitude150),
        long: parseFloat(dataPerCode?.page15?.longitude150),
      });
      setgnet05deg180({
        ...gnet05deg180,
        lat: parseFloat(dataPerCode?.page15?.latitude180),
        long: parseFloat(dataPerCode?.page15?.longitude180),
      });
      setgnet05deg210({
        ...gnet05deg210,
        lat: parseFloat(dataPerCode?.page15?.latitude210),
        long: parseFloat(dataPerCode?.page15?.longitude210),
      });
      setgnet05deg240({
        ...gnet05deg240,
        lat: parseFloat(dataPerCode?.page15?.latitude240setgnet05deg240),
        long: parseFloat(dataPerCode?.page15?.longitude240setgnet05deg240),
      });
      setgnet05deg270({
        ...gnet05deg270,
        lat: parseFloat(dataPerCode?.page15?.latitude270),
        long: parseFloat(dataPerCode?.page15?.longitude270),
      });
      setgnet05deg300({
        ...gnet05deg300,
        lat: parseFloat(dataPerCode?.page15?.latitude300),
        long: parseFloat(dataPerCode?.page15?.longitude300),
      });
      setgnet05deg330({
        ...gnet05deg330,
        lat: parseFloat(dataPerCode?.page15?.latitude330),
        long: parseFloat(dataPerCode?.page15?.longitude330),
      });
      setgnet2deg0({
        ...gnet2deg0,
        lat: parseFloat(dataPerCode?.page15?.latitude0),
        long: parseFloat(dataPerCode?.page15?.longitude0),
      });
      setgnet2deg30({
        ...gnet2deg30,
        lat: parseFloat(dataPerCode?.page15?.latitude30),
        long: parseFloat(dataPerCode?.page15?.longitude30),
      });
      setgnet2deg60({
        ...gnet2deg60,
        lat: parseFloat(dataPerCode?.page15?.latitude60),
        long: parseFloat(dataPerCode?.page15?.longitude60),
      });
      setgnet2deg90({
        ...gnet2deg90,
        lat: parseFloat(dataPerCode?.page15?.latitude90),
        long: parseFloat(dataPerCode?.page15?.longitude90),
      });
      setgnet2deg120({
        ...gnet2deg120,
        lat: parseFloat(dataPerCode?.page15?.latitude120),
        long: parseFloat(dataPerCode?.page15?.longitude120),
      });
      setgnet2deg150({
        ...gnet2deg150,
        lat: parseFloat(dataPerCode?.page15?.latitude150),
        long: parseFloat(dataPerCode?.page15?.longitude150),
      });
      setgnet2deg180({
        ...gnet2deg180,
        lat: parseFloat(dataPerCode?.page15?.latitude180),
        long: parseFloat(dataPerCode?.page15?.longitude180),
      });
      setgnet2deg210({
        ...gnet2deg210,
        lat: parseFloat(dataPerCode?.page15?.latitude210),
        long: parseFloat(dataPerCode?.page15?.longitude210),
      });
      setgnet2deg240({
        ...gnet2deg240,
        lat: parseFloat(dataPerCode?.page15?.latitude240),
        long: parseFloat(dataPerCode?.page15?.longitude240),
      });
      setgnet2deg270({
        ...gnet2deg270,
        lat: parseFloat(dataPerCode?.page15?.latitude270),
        long: parseFloat(dataPerCode?.page15?.longitude270),
      });
      setgnet2deg300({
        ...gnet2deg300,
        lat: parseFloat(dataPerCode?.page15?.latitude300),
        long: parseFloat(dataPerCode?.page15?.longitude300),
      });
      setgnet2deg330({
        ...gnet2deg330,
        lat: parseFloat(dataPerCode?.page15?.latitude330),
        long: parseFloat(dataPerCode?.page15?.longitude330),
      });
      setkandidat1({
        ...kandidat1,
        lat: parseFloat(dataPerCode?.page18?.latitudekandidat1),
        long: parseFloat(dataPerCode?.page18?.longitudekandidat1),
      });
      setkandidat2({
        ...kandidat2,
        lat: parseFloat(dataPerCode?.page18?.latitudekandidat2),
        long: parseFloat(dataPerCode?.page18?.longitudekandidat2),
      });
      setpenggunaPotensial1({
        ...penggunaPotensial1,
        lat: parseFloat(dataPerCode?.page19?.latitude1),
        long: parseFloat(dataPerCode?.page19?.longitude1),
      });
      setpenggunaPotensial2({
        ...penggunaPotensial2,
        lat: parseFloat(dataPerCode?.page19?.latitude2),
        long: parseFloat(dataPerCode?.page19?.longitude2),
      });
      setpenggunaPotensial3({
        ...penggunaPotensial3,
        lat: parseFloat(dataPerCode?.page19?.latitude3),
        long: parseFloat(dataPerCode?.page19?.longitude3),
      });
      setpenggunaPotensial4({
        ...penggunaPotensial4,
        lat: parseFloat(dataPerCode?.page19?.latitude4),
        long: parseFloat(dataPerCode?.page19?.longitude4),
      });
      setpenggunaPotensial5({
        ...penggunaPotensial5,
        lat: parseFloat(dataPerCode?.page19?.latitude5),
        long: parseFloat(dataPerCode?.page19?.longitude5),
      });
      setpenggunaPotensial6({
        ...penggunaPotensial6,
        lat: parseFloat(dataPerCode?.page19?.latitude6),
        long: parseFloat(dataPerCode?.page19?.longitude6),
      });
      setpenggunaPotensial7({
        ...penggunaPotensial7,
        lat: parseFloat(dataPerCode?.page19?.latitude7),
        long: parseFloat(dataPerCode?.page19?.longitude7),
      });
      setpenggunaPotensial8({
        ...penggunaPotensial8,
        lat: parseFloat(dataPerCode?.page19?.latitude8),
        long: parseFloat(dataPerCode?.page19?.longitude8),
      });
      setpenggunaPotensial9({
        ...penggunaPotensial9,
        lat: parseFloat(dataPerCode?.page19?.latitude9),
        long: parseFloat(dataPerCode?.page19?.longitude9),
      });
      setpenggunaPotensial10({
        ...penggunaPotensial10,
        lat: parseFloat(dataPerCode?.page19?.latitude10),
        long: parseFloat(dataPerCode?.page19?.longitude10),
      });
      setpenggunaPotensial11({
        ...penggunaPotensial11,
        lat: parseFloat(dataPerCode?.page19?.latitude11),
        long: parseFloat(dataPerCode?.page19?.longitude11),
      });
      setpenggunaPotensial12({
        ...penggunaPotensial12,
        lat: parseFloat(dataPerCode?.page19?.latitude12),
        long: parseFloat(dataPerCode?.page19?.longitude12),
      });
      setpenggunaPotensial13({
        ...penggunaPotensial13,
        lat: parseFloat(dataPerCode?.page19?.latitude13),
        long: parseFloat(dataPerCode?.page19?.longitude13),
      });
      setpenggunaPotensial14({
        ...penggunaPotensial14,
        lat: parseFloat(dataPerCode?.page19?.latitude14),
        long: parseFloat(dataPerCode?.page19?.longitude14),
      });
      setpenggunaPotensial15({
        ...penggunaPotensial15,
        lat: parseFloat(dataPerCode?.page19?.latitude15),
        long: parseFloat(dataPerCode?.page19?.longitude15),
      });
      setaksesSite1({
        ...aksesSite1,
        lat: parseFloat(dataPerCode?.page20?.latitudeaksessite1),
        long: parseFloat(dataPerCode?.page20?.longitudeaksessite1),
      });
      setaksesSite2({
        ...aksesSite2,
        lat: parseFloat(dataPerCode?.page20?.latitudeaksessite2),
        long: parseFloat(dataPerCode?.page20?.longitudeaksessite2),
      });
      setaksesSite3({
        ...aksesSite3,
        lat: parseFloat(dataPerCode?.page20?.latitudeaksessite3),
        long: parseFloat(dataPerCode?.page20?.longitudeaksessite3),
      });
      setaksesSite4({
        ...aksesSite4,
        lat: parseFloat(dataPerCode?.page20?.latitudeaksessite4),
        long: parseFloat(dataPerCode?.page20?.longitudeaksessite4),
      });
      setpathProfile({
        ...pathProfile,
        lat: parseFloat(dataPerCode?.page23?.latitudepathprofile),
        long: parseFloat(dataPerCode?.page23?.longitudepathprofile),
      });
      setdesktopContour({
        ...desktopContour,
        lat: parseFloat(dataPerCode?.page23?.latitudedesktopcontour),
        long: parseFloat(dataPerCode?.page23?.longitudedesktopcontour),
      });
      setGPSSiteA({
        ...GPSSiteA,
        lat: parseFloat(dataPerCode?.page25?.latitudegpssitea),
        long: parseFloat(dataPerCode?.page25?.longitudegpssitea),
      });
      setGPSSiteB({
        ...GPSSiteB,
        lat: parseFloat(dataPerCode?.page25?.latitudegpssiteb),
        long: parseFloat(dataPerCode?.page25?.longitudegpssiteb),
      });
      settowerSiteA({
        ...towerSiteA,
        lat: parseFloat(dataPerCode?.page26?.latitude),
        long: parseFloat(dataPerCode?.page26?.longitude),
      });
      setlokasiAntennaMWSiteA({
        ...lokasiAntennaMWSiteA,
        lat: parseFloat(dataPerCode?.page27?.latitude),
        long: parseFloat(dataPerCode?.page27?.longitude),
      });
      setpanoramicSiteA({
        ...panoramicSiteA,
        lat: parseFloat(dataPerCode?.page28?.latitude),
        long: parseFloat(dataPerCode?.page28?.longitude),
      });
      settowerSiteB({
        ...towerSiteB,
        lat: parseFloat(dataPerCode?.page29?.latitude),
        long: parseFloat(dataPerCode?.page29?.longitude),
      });
      setlokasiAntennaMWSiteB({
        ...lokasiAntennaMWSiteB,
        lat: parseFloat(dataPerCode?.page30?.latitude),
        long: parseFloat(dataPerCode?.page30?.longitude),
      });
      setpanoramicSiteB({
        ...panoramicSiteB,
        lat: parseFloat(dataPerCode?.page31?.latitude),
        long: parseFloat(dataPerCode?.page31?.longitude),
      });
      setAkeBTanpaZoom({
        ...AkeBTanpaZoom,
        lat: parseFloat(dataPerCode?.page32?.latitudeakebtanpazoom),
        long: parseFloat(dataPerCode?.page32?.longitudeakebtanpazoom),
      });
      setAkeBDenganZoom({
        ...AkeBDenganZoom,
        lat: parseFloat(dataPerCode?.page32?.latitudeakebdenganzoom),
        long: parseFloat(dataPerCode?.page32?.longitudeakebdenganzoom),
      });
      setBkeATanpaZoom({
        ...BkeATanpaZoom,
        lat: parseFloat(dataPerCode?.page32?.latitudebkeatanpazoom),
        long: parseFloat(dataPerCode?.page32?.longitudebkeatanpazoom),
      });
      setBkeADenganZoom({
        ...BkeADenganZoom,
        lat: parseFloat(dataPerCode?.page32?.latitudebkeadenganzoom),
        long: parseFloat(dataPerCode?.page32?.longitudebkeadenganzoom),
      });
      setBkeADenganZoom({
        ...BkeADenganZoom,
        lat: parseFloat(dataPerCode?.page32?.latitudebkeadenganzoom),
        long: parseFloat(dataPerCode?.page32?.longitudebkeadenganzoom),
      });
      setpathProfileMW({
        ...pathProfileMW,
        lat: parseFloat(dataPerCode?.page33?.latitude),
        long: parseFloat(dataPerCode?.page33?.longitude),
      });
      setpetaLokasiKeseluruhan({
        ...petaLokasiKeseluruhan,
        lat: parseFloat(dataPerCode?.page34?.latitude),
        long: parseFloat(dataPerCode?.page34?.longitude),
      });
      settitikTerminasiDiPOI({
        ...titikTerminasiDiPOI,
        lat: parseFloat(dataPerCode?.page41?.latitude),
        long: parseFloat(dataPerCode?.page41?.longitude),
      });
      setruteFiberOptik({
        ...ruteFiberOptik,
        lat: parseFloat(dataPerCode?.page3?.koordinatgpswgs84latitude),
        long: parseFloat(dataPerCode?.page3?.koordinatgpswgs84longitude),
      });
      setasPlanDrawing({
        ...asPlanDrawing,
        lat: parseFloat(dataPerCode?.page3?.koordinatgpswgs84latitude),
        long: parseFloat(dataPerCode?.page3?.koordinatgpswgs84longitude),
      });
    } else {
      settitikLokasi({
        lat: parseFloat(dataPerCode?.latitude),
        long: parseFloat(dataPerCode?.longitude),
      });
      setphotosOfLandToBeBuilt({
        lat: parseFloat(
          dataPerCode?.page11?.photosofthelandtobebuilded[0]?.device_lat
        ),
        long: parseFloat(
          dataPerCode?.page11?.photosofthelandtobebuilded[0]?.device_lon
        ),
      });
      setlayoutSite({
        lat: parseFloat(dataPerCode?.page12?.layoutsite?.device_lat),
        long: parseFloat(dataPerCode?.page12?.layoutsite?.device_lon),
      });
      setfotoSisiBarat({
        lat: parseFloat(dataPerCode?.page13?.fotosisibarat?.device_lat),
        long: parseFloat(dataPerCode?.page13?.fotosisibarat?.device_lon),
      });
      setfotoSisiSelatan({
        lat: parseFloat(dataPerCode?.page13?.fotosisiselatan?.device_lat),
        long: parseFloat(dataPerCode?.page13?.fotosisiselatan?.device_lon),
      });
      setfotoSisiUtara({
        lat: parseFloat(dataPerCode?.page13?.fotosisiutara?.device_lat),
        long: parseFloat(dataPerCode?.page13?.fotosisiutara?.device_lon),
      });
      setfotoSisiTimur({
        lat: parseFloat(dataPerCode?.page13?.fotosisitimur?.device_lat),
        long: parseFloat(dataPerCode?.page13?.fotosisitimur?.device_lon),
      });
      setgambarLahan({
        lat: parseFloat(dataPerCode?.page13?.gambarlahan?.device_lat),
        long: parseFloat(dataPerCode?.page13?.gambarlahan?.device_lon),
      });
      setMakingGPS({
        lat: parseFloat(dataPerCode?.page13?.makinggps?.device_lat),
        long: parseFloat(dataPerCode?.page13?.makinggps?.device_lon),
      });
      setgnet05({
        lat: parseFloat(
          dataPerCode?.page15?.photocapturegnettrack05km[0]?.data?.foto
            ?.device_lat
        ),
        long: parseFloat(
          dataPerCode?.page15?.photocapturegnettrack05km[0]?.data?.foto
            ?.device_lon
        ),
      });
      setgnet5({
        lat: parseFloat(
          dataPerCode?.page15?.photocapturegnettrack5km[0]?.data?.foto
            ?.device_lat
        ),
        long: parseFloat(
          dataPerCode?.page15?.photocapturegnettrack5km[0]?.data?.foto
            ?.device_lon
        ),
      });
      setroadRoute({
        lat: parseFloat(
          dataPerCode?.page16?.photocapturegnettrackroadroute[0]?.data?.foto
            ?.device_lat
        ),
        long: parseFloat(
          dataPerCode?.page16?.photocapturegnettrackroadroute[0]?.data?.foto
            ?.device_lon
        ),
      });
      setlocationMapping({
        lat: parseFloat(dataPerCode?.page17?.locationmapping?.device_lat),
        long: parseFloat(dataPerCode?.page17?.locationmapping?.device_lon),
      });
      setsector0({
        lat: parseFloat(dataPerCode?.page19?.sector0gambarlahan?.device_lat),
        long: parseFloat(dataPerCode?.page19?.sector0gambarlahan?.device_lon),
      });
      setsector45({
        lat: parseFloat(dataPerCode?.page19?.sector45gambarlahan?.device_lat),
        long: parseFloat(dataPerCode?.page19?.sector45gambarlahan?.device_lon),
      });
      setsector90({
        lat: parseFloat(dataPerCode?.page19?.sector90gambarlahan?.device_lat),
        long: parseFloat(dataPerCode?.page19?.sector90gambarlahan?.device_lon),
      });
      setsector135({
        lat: parseFloat(dataPerCode?.page19?.sector135gambarlahan?.device_lat),
        long: parseFloat(dataPerCode?.page19?.sector135gambarlahan?.device_lon),
      });
      setsector180({
        lat: parseFloat(dataPerCode?.page19?.sector180gambarlahan?.device_lat),
        long: parseFloat(dataPerCode?.page19?.sector180gambarlahan?.device_lon),
      });
      setsector225({
        lat: parseFloat(dataPerCode?.page19?.sector225gambarlahan?.device_lat),
        long: parseFloat(dataPerCode?.page19?.sector225gambarlahan?.device_lon),
      });
      setsector270({
        lat: parseFloat(dataPerCode?.page19?.sector270gambarlahan?.device_lat),
        long: parseFloat(dataPerCode?.page19?.sector270gambarlahan?.device_lon),
      });
      setsector315({
        lat: parseFloat(dataPerCode?.page19?.sector315gambarlahan?.device_lat),
        long: parseFloat(dataPerCode?.page19?.sector315gambarlahan?.device_lon),
      });
      setsite1({
        lat: parseFloat(dataPerCode?.page20?.aksessite1gambarlahan?.device_lat),
        long: parseFloat(
          dataPerCode?.page20?.aksessite1gambarlahan?.device_lon
        ),
      });
      setsite2({
        lat: parseFloat(dataPerCode?.page20?.aksessite2gambarlahan?.device_lat),
        long: parseFloat(
          dataPerCode?.page20?.aksessite2gambarlahan?.device_lon
        ),
      });
      setsite3({
        lat: parseFloat(dataPerCode?.page20?.aksessite3gambarlahan?.device_lat),
        long: parseFloat(
          dataPerCode?.page20?.aksessite3gambarlahan?.device_lon
        ),
      });
      setsite4({
        lat: parseFloat(dataPerCode?.page20?.aksessite4gambarlahan?.device_lat),
        long: parseFloat(
          dataPerCode?.page20?.aksessite4gambarlahan?.device_lon
        ),
      });
    }
  }, [dataPerCode]);

  return (
    <div style={{ display: "flex", flexDirection: "row" }}>
      {kode !== undefined && dataPerCode.batch === "Batch 2" ? (
        <div className="checkboxWrapper">
          {Number.isNaN(titikLokasi2.lat) === true ||
          Number.isNaN(titikLokasi2.long) === true ? (
            <></>
          ) : (
            <CheckboxLabel
              id="titikLokasi2"
              initialState={titikLokasi2}
              label="Titik Lokasi 2"
              setter={setTitikLokasi2}
              batch="2"
            />
          )}
          {Number.isNaN(towerData.lat) === true ||
          Number.isNaN(towerData.long) === true ? (
            <></>
          ) : (
            <CheckboxLabel
              id="towerData"
              initialState={towerData}
              label="Tower Data"
              setter={settowerData}
              batch="2"
            />
          )}
          {Number.isNaN(lahanYangAkanDibangun.lat) === true ||
          Number.isNaN(lahanYangAkanDibangun.long) === true ? (
            <></>
          ) : (
            <CheckboxLabel
              id="lahanYangAkanDibangun"
              initialState={lahanYangAkanDibangun}
              label="Lahan Yang Akan Dibangun"
              setter={setlahanYangAkanDibangun}
              batch="2"
            />
          )}
          {Number.isNaN(layoutSite2.lat) === true ||
          Number.isNaN(layoutSite2.long) === true ? (
            <></>
          ) : (
            <CheckboxLabel
              id="layoutSite2"
              initialState={layoutSite2}
              label="Layout Site"
              setter={setlayoutSite2}
              batch="2"
            />
          )}
          {Number.isNaN(tower.lat) === true ||
          Number.isNaN(tower.long) === true ? (
            <></>
          ) : (
            <CheckboxLabel
              id="tower"
              initialState={tower}
              label="Tower"
              setter={settower}
              batch="2"
            />
          )}
          {Number.isNaN(denahLokasiArea.lat) === true ||
          Number.isNaN(denahLokasiArea.long) === true ? (
            <></>
          ) : (
            <CheckboxLabel
              id="denahLokasiArea"
              initialState={denahLokasiArea}
              label="Denah Lokasi Area"
              setter={setdenahLokasiArea}
              batch="2"
            />
          )}
          {Number.isNaN(lahanKandidat.lat) === true ||
          Number.isNaN(lahanKandidat.long) === true ? (
            <></>
          ) : (
            <CheckboxLabel
              id="lahanKandidat"
              initialState={lahanKandidat}
              label="Lahan Kandidat"
              setter={setlahanKandidat}
              batch="2"
            />
          )}
          {Number.isNaN(markingGPS.lat) === true ||
          Number.isNaN(markingGPS.long) === true ? (
            <></>
          ) : (
            <CheckboxLabel
              id="markingGPS"
              initialState={markingGPS}
              label="Marking GPS"
              setter={setmarkingGPS}
              batch="2"
            />
          )}
          {Number.isNaN(obstacle0.lat) === true ||
          Number.isNaN(obstacle0.long) === true ? (
            <></>
          ) : (
            <CheckboxLabel
              id="obstacle0"
              initialState={obstacle0}
              label="Obstacle 0 Derajat"
              setter={setobstacle0}
              batch="2"
            />
          )}
          {Number.isNaN(obstacle45.lat) === true ||
          Number.isNaN(obstacle45.long) === true ? (
            <></>
          ) : (
            <CheckboxLabel
              id="obstacle45"
              initialState={obstacle45}
              label="Obstacle 45 Derajat"
              setter={setobstacle45}
              batch="2"
            />
          )}
          {Number.isNaN(obstacle90.lat) === true ||
          Number.isNaN(obstacle90.long) === true ? (
            <></>
          ) : (
            <CheckboxLabel
              id="obstacle90"
              initialState={obstacle90}
              label="Obstacle 90 Derajat"
              setter={setobstacle90}
              batch="2"
            />
          )}
          {Number.isNaN(obstacle135.lat) === true ||
          Number.isNaN(obstacle135.long) === true ? (
            <></>
          ) : (
            <CheckboxLabel
              id="obstacle135"
              initialState={obstacle135}
              label="Obstacle 135 Derajat"
              setter={setobstacle135}
              batch="2"
            />
          )}
          {Number.isNaN(obstacle180.lat) === true ||
          Number.isNaN(obstacle180.long) === true ? (
            <></>
          ) : (
            <CheckboxLabel
              id="obstacle180"
              initialState={obstacle180}
              label="Obstacle 180 Derajat"
              setter={setobstacle180}
              batch="2"
            />
          )}
          {Number.isNaN(obstacle225.lat) === true ||
          Number.isNaN(obstacle225.long) === true ? (
            <></>
          ) : (
            <CheckboxLabel
              id="obstacle225"
              initialState={obstacle225}
              label="Obstacle 225 Derajat"
              setter={setobstacle225}
              batch="2"
            />
          )}
          {Number.isNaN(obstacle270.lat) === true ||
          Number.isNaN(obstacle270.long) === true ? (
            <></>
          ) : (
            <CheckboxLabel
              id="obstacle270"
              initialState={obstacle270}
              label="Obstacle 270 Derajat"
              setter={setobstacle270}
              batch="2"
            />
          )}
          {Number.isNaN(obstacle315.lat) === true ||
          Number.isNaN(obstacle315.long) === true ? (
            <></>
          ) : (
            <CheckboxLabel
              id="obstacle315"
              initialState={obstacle315}
              label="Obstacle 315 Derajat"
              setter={setobstacle315}
              batch="2"
            />
          )}
        </div>
      ) : (
        <div className="checkboxWrapper">
          {Number.isNaN(titikLokasi.lat) === true ||
          Number.isNaN(titikLokasi.long) === true ? (
            <></>
          ) : (
            <CheckboxLabel
              id="titikLokasi"
              handleClick={setshowTitikLokasi}
              label="Titik Lokasi"
            />
          )}
          {Number.isNaN(photosOfLandToBeBuilt.lat) === true ||
          Number.isNaN(photosOfLandToBeBuilt.long) === true ? (
            <></>
          ) : (
            <CheckboxLabel
              id="landBuilt"
              handleClick={setshowphotosOfLandToBeBuilt}
              label="Foto Lahan yang Akan Dibangun"
            />
          )}
          {Number.isNaN(layoutSite.lat) === true ||
          Number.isNaN(layoutSite.long) === true ? (
            <></>
          ) : (
            <CheckboxLabel
              id="layoutsite"
              handleClick={setshowlayoutSite}
              label="Layout Site"
            />
          )}
          {Number.isNaN(fotoSisiBarat.lat) === true ||
          Number.isNaN(fotoSisiBarat.long) === true ? (
            <></>
          ) : (
            <CheckboxLabel
              id="sisiBarat"
              handleClick={setshowfotoSisiBarat}
              label="Foto Sisi Barat"
            />
          )}
          {Number.isNaN(fotoSisiSelatan.lat) === true ||
          Number.isNaN(fotoSisiSelatan.long) === true ? (
            <></>
          ) : (
            <CheckboxLabel
              id="sisiBarat"
              handleClick={setshowfotoSisiSelatan}
              label="Foto Sisi Selatan"
            />
          )}
          {Number.isNaN(fotoSisiTimur.lat) === true ||
          Number.isNaN(fotoSisiTimur.long) === true ? (
            <></>
          ) : (
            <CheckboxLabel
              id="sisiBarat"
              handleClick={setshowfotoSisiTimur}
              label="Foto Sisi Timur"
            />
          )}
          {Number.isNaN(fotoSisiUtara.lat) === true ||
          Number.isNaN(fotoSisiUtara.long) === true ? (
            <></>
          ) : (
            <CheckboxLabel
              id="sisiBarat"
              handleClick={setshowfotoSisiUtara}
              label="Foto Sisi Utara"
            />
          )}
          {Number.isNaN(gambarLahan.lat) || Number.isNaN(gambarLahan.long) ? (
            <></>
          ) : (
            <CheckboxLabel
              id="gambarLahan"
              handleClick={setshowGambarLahan}
              label="Gambar Lahan"
            />
          )}
          {Number.isNaN(makingGPS.lat) || Number.isNaN(makingGPS.long) ? (
            <></>
          ) : (
            <CheckboxLabel
              id="makingGPS"
              handleClick={setshowMakingGPS}
              label="Making GPS"
            />
          )}

          {Number.isNaN(gnet05.lat) || Number.isNaN(gnet05.long) ? (
            <></>
          ) : (
            <CheckboxLabel
              id="gnet05"
              handleClick={setshowgnet05}
              label="G-NETTRACK 0,5KM"
            />
          )}
          {Number.isNaN(gnet5.lat) || Number.isNaN(gnet5.long) ? (
            <></>
          ) : (
            <CheckboxLabel
              id="gnet5"
              handleClick={setshowgnet5}
              label="G-NETTRACK 2KM"
            />
          )}
          {Number.isNaN(roadRoute.lat) || Number.isNaN(roadRoute.long) ? (
            <></>
          ) : (
            <CheckboxLabel
              id="roadRoute"
              handleClick={setshowroadRoute}
              label="Rute Jalan"
            />
          )}
          {Number.isNaN(locationMapping.lat) ||
          Number.isNaN(locationMapping.long) ? (
            <></>
          ) : (
            <CheckboxLabel
              id="locationMapping"
              handleClick={setshowlocationMapping}
              label="Location Mapping"
            />
          )}

          {Number.isNaN(sector0.lat) || Number.isNaN(sector0.long) ? (
            <></>
          ) : (
            <CheckboxLabel
              id="sector0"
              handleClick={setshowsector0}
              label="Sector 0"
            />
          )}
          {Number.isNaN(sector45.lat) || Number.isNaN(sector45.long) ? (
            <></>
          ) : (
            <CheckboxLabel
              id="sector45"
              handleClick={setshowsector45}
              label="Sector 45"
            />
          )}
          {Number.isNaN(sector90.lat) || Number.isNaN(sector90.long) ? (
            <></>
          ) : (
            <CheckboxLabel
              id="sector90"
              handleClick={setshowsector90}
              label="Sector 90"
            />
          )}
          {Number.isNaN(sector135.lat) || Number.isNaN(sector135.long) ? (
            <></>
          ) : (
            <CheckboxLabel
              id="sector135"
              handleClick={setshowsector135}
              label="Sector 135"
            />
          )}
          {Number.isNaN(sector180.lat) || Number.isNaN(sector180.long) ? (
            <></>
          ) : (
            <CheckboxLabel
              id="sector180"
              handleClick={setshowsector180}
              label="Sector 180"
            />
          )}
          {Number.isNaN(sector225.lat) || Number.isNaN(sector225.long) ? (
            <></>
          ) : (
            <CheckboxLabel
              id="sector225"
              handleClick={setshowsector225}
              label="Sector 225"
            />
          )}
          {Number.isNaN(sector270.lat) || Number.isNaN(sector270.long) ? (
            <></>
          ) : (
            <CheckboxLabel
              id="sector270"
              handleClick={setshowsector270}
              label="Sector 270"
            />
          )}
          {Number.isNaN(sector315.lat) || Number.isNaN(sector315.long) ? (
            <></>
          ) : (
            <CheckboxLabel
              id="sector315"
              handleClick={setshowsector315}
              label="Sector 315"
            />
          )}
          {Number.isNaN(site1.lat) || Number.isNaN(site1.long) ? (
            <></>
          ) : (
            <CheckboxLabel
              id="site1"
              handleClick={setshowsite1}
              label="Site 1"
            />
          )}
          {Number.isNaN(site2.lat) || Number.isNaN(site2.long) ? (
            <></>
          ) : (
            <CheckboxLabel
              id="site2"
              handleClick={setshowsite2}
              label="Site 2"
            />
          )}
          {Number.isNaN(site3.lat) || Number.isNaN(site3.long) ? (
            <></>
          ) : (
            <CheckboxLabel
              id="site3"
              handleClick={setshowsite3}
              label="Site 3"
            />
          )}
          {Number.isNaN(site4.lat) || Number.isNaN(site4.long) ? (
            <></>
          ) : (
            <CheckboxLabel
              id="site4"
              handleClick={setshowsite4}
              label="Site 4"
            />
          )}
        </div>
      )}
      <Viewer full>
        {kode === undefined && (
          <>
            <CameraFlyToBoundingSphere
              boundingSphere={
                new BoundingSphere(
                  Cartesian3.fromDegrees(137.96889541, -3.70455916, 200),
                  0
                )
              }
              offset={
                new HeadingPitchRange(0, CesiumMath.toRadians(-30), 80000)
              }
              duration={3}
            />
            <KmlDataSource
              data={
                "https://cesium.naufalibnusalam.com/kml/UNet_Generated_MUL053MM1_PUNCAKMULIA.kmz"
              }
              onLoad={(dataSource) => {
                // you can modify data source here
                dataSource.entities.values.forEach((e) => {
                  e.label = undefined;
                });
              }}
            />
          </>
        )}
        {showTitikLokasi && (
          <EntityBuilder
            lat={titikLokasi.lat}
            long={titikLokasi.long}
            icon="signalIcon"
            name="Titik Lokasi"
          />
        )}
        {showphotosOfLandToBeBuilt && (
          <EntityBuilder
            lat={photosOfLandToBeBuilt.lat}
            long={photosOfLandToBeBuilt.long}
            icon="building"
            name="Foto Lahan yang Akan Dibangun"
            img={url + dataPerCode.page11.photosofthelandtobebuilded[0].path}
          />
        )}
        {showlayoutSite && (
          <EntityBuilder
            lat={layoutSite.lat}
            long={layoutSite.long}
            icon="situs"
            name="Layout Site"
            img={url + dataPerCode.page12.layoutsite.path}
          />
        )}
        {showfotoSisiBarat && (
          <EntityBuilder
            lat={fotoSisiBarat.lat}
            long={fotoSisiBarat.long}
            icon="situs"
            name="Foto Sisi Barat"
            img={url + dataPerCode.page13.fotosisibarat.path}
          />
        )}
        {showfotoSisiSelatan && (
          <EntityBuilder
            lat={fotoSisiSelatan.lat}
            long={fotoSisiSelatan.long}
            icon="situs"
            name="Foto Sisi Selatan"
            img={url + dataPerCode?.page13?.fotosisiselatan?.path}
          />
        )}
        {showfotoSisiTimur && (
          <EntityBuilder
            lat={fotoSisiTimur.lat}
            long={fotoSisiTimur.long}
            icon="situs"
            name="Foto Sisi Timur"
            img={url + dataPerCode?.page13?.fotosisitimur?.path}
          />
        )}
        {showfotoSisiUtara && (
          <EntityBuilder
            lat={fotoSisiUtara.lat}
            long={fotoSisiUtara.long}
            icon="situs"
            name="Foto Sisi Utara"
            img={url + dataPerCode?.page13?.fotosisiutara?.path}
          />
        )}
        {titikLokasi2?.show && (
          <EntityBuilder
            lat={titikLokasi2.lat}
            long={titikLokasi2.long}
            icon="signalIcon"
            name="Titik Lokasi 2"
          />
        )}
        {towerData?.show && (
          <EntityBuilder
            lat={towerData.lat}
            long={towerData.long}
            icon="signalIcon"
            name="Tower Data"
          />
        )}
        {lahanYangAkanDibangun?.show && (
          <EntityBuilder
            lat={lahanYangAkanDibangun.lat}
            long={lahanYangAkanDibangun.long}
            icon="signalIcon"
            name="Lahan yang akan Dibangun"
          />
        )}
        {layoutSite2?.show && (
          <EntityBuilder
            lat={layoutSite2.lat}
            long={layoutSite2.long}
            icon="signalIcon"
            name="Layout Site"
          />
        )}
        {tower?.show && (
          <EntityBuilder
            lat={tower.lat}
            long={tower.long}
            icon="signalIcon"
            name="Tower"
          />
        )}
        {denahLokasiArea?.show && (
          <EntityBuilder
            lat={denahLokasiArea.lat}
            long={denahLokasiArea.long}
            icon="signalIcon"
            name="Denah Lokasi Area"
          />
        )}
        {lahanKandidat?.show && (
          <EntityBuilder
            lat={lahanKandidat.lat}
            long={lahanKandidat.long}
            icon="signalIcon"
            name="Lahan Kandidat"
          />
        )}
        {markingGPS?.show && (
          <EntityBuilder
            lat={markingGPS.lat}
            long={markingGPS.long}
            icon="signalIcon"
            name="Marking GPS"
          />
        )}
        {obstacle0?.show && (
          <EntityBuilder
            lat={obstacle0.lat}
            long={obstacle0.long}
            icon="signalIcon"
            name="Obstacle 0 Derajat"
          />
        )}
        {obstacle45?.show && (
          <EntityBuilder
            lat={obstacle45.lat}
            long={obstacle45.long}
            icon="signalIcon"
            name="Obstacle 45 Derajat"
          />
        )}
        {obstacle90?.show && (
          <EntityBuilder
            lat={obstacle90.lat}
            long={obstacle90.long}
            icon="signalIcon"
            name="Obstacle 90 Derajat"
          />
        )}
        {obstacle135?.show && (
          <EntityBuilder
            lat={obstacle135.lat}
            long={obstacle135.long}
            icon="signalIcon"
            name="Obstacle 135 Derajat"
          />
        )}
        {obstacle180?.show && (
          <EntityBuilder
            lat={obstacle180.lat}
            long={obstacle180.long}
            icon="signalIcon"
            name="Obstacle 180 Derajat"
          />
        )}
        {obstacle225?.show && (
          <EntityBuilder
            lat={obstacle225.lat}
            long={obstacle225.long}
            icon="signalIcon"
            name="Obstacle 225 Derajat"
          />
        )}
        {obstacle270?.show && (
          <EntityBuilder
            lat={obstacle270.lat}
            long={obstacle270.long}
            icon="signalIcon"
            name="Obstacle 270 Derajat"
          />
        )}
        {obstacle315?.show && (
          <EntityBuilder
            lat={obstacle315.lat}
            long={obstacle315.long}
            icon="signalIcon"
            name="Obstacle 315 Derajat"
          />
        )}
      </Viewer>
    </div>
  );
};

export default Resium;
