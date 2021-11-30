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

  useEffect(() => {
    let params = {
      field: "kode",
      value: kode,
    };
    API.searchHasilBTS(params)
      .then((res) => {
        console.log("console log nya res", res?.data?.values[0]);
        setDataPerCode(res?.data?.values[0]?.data[0]);
      })
      .then(() => {})
      .catch((err) => console.log(err?.response));
  }, []);

  useEffect(() => {
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
        dataPerCode?.page15?.photocapturegnettrack5km[0]?.data?.foto?.device_lat
      ),
      long: parseFloat(
        dataPerCode?.page15?.photocapturegnettrack5km[0]?.data?.foto?.device_lon
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
      long: parseFloat(dataPerCode?.page20?.aksessite1gambarlahan?.device_lon),
    });
    setsite2({
      lat: parseFloat(dataPerCode?.page20?.aksessite2gambarlahan?.device_lat),
      long: parseFloat(dataPerCode?.page20?.aksessite2gambarlahan?.device_lon),
    });
    setsite3({
      lat: parseFloat(dataPerCode?.page20?.aksessite3gambarlahan?.device_lat),
      long: parseFloat(dataPerCode?.page20?.aksessite3gambarlahan?.device_lon),
    });
    setsite4({
      lat: parseFloat(dataPerCode?.page20?.aksessite4gambarlahan?.device_lat),
      long: parseFloat(dataPerCode?.page20?.aksessite4gambarlahan?.device_lon),
    });
  }, [dataPerCode]);

  // console.log('dataPerCode', dataPerCode);
  // console.log('titik lokasi', Number.isNaN(titikLokasi.lat));
  // console.log(
  //   'photos of land to be built',
  //   Number.isNaN(photosOfLandToBeBuilt.lat)
  // );
  // console.log('layoutSite', layoutSite);
  // console.log('fotoSisiBarat', fotoSisiBarat);
  // console.log('fotoSisiSelatan', fotoSisiSelatan);
  // console.log('fotoSisiTimur', fotoSisiTimur);
  // console.log('fotoSisiUtara', fotoSisiUtara);
  // console.log('gambarLahan', gambarLahan);
  // console.log('makingGPS', makingGPS);
  // console.log('gnet05', gnet05);
  // console.log('gnet5', gnet5);
  // console.log('roadRoute', roadRoute);
  // console.log('locationMapping', locationMapping);
  // console.log('sector0', sector0);
  // console.log('sector45', sector45);
  // console.log('sector90', sector90);
  // console.log('sector135', sector135);
  // console.log('sector180', sector180);
  // console.log('sector225', sector225);
  // console.log('sector270', sector270);
  // console.log('sector315', sector315);
  // console.log('site1', site1);
  // console.log('site2', site2);
  // console.log('site3', site3);
  // console.log('site4', site4);

  return (
    <div style={{ display: "flex", flexDirection: "row" }}>
      {kode !== undefined && (
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
      </Viewer>
    </div>
  );
};

export default Resium;
