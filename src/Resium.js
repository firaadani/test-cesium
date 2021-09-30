import React, { useState } from 'react';
import {
  Cartesian3,
  ArcGisMapServerImageryProvider,
  Math as CesiumMath,
  BoundingSphere,
  HeadingPitchRange,
} from 'cesium';
import {
  Viewer,
  Entity,
  EntityDescription,
  PointGraphics,
  CameraFlyToBoundingSphere,
  KmlDataSource,
  CzmlDataSource,
  BillboardGraphics,
} from 'resium';
import Color from 'cesium/Source/Core/Color';

import signalIcon from './antenna.svg';
import buildingIcon from './building.svg';

const Resium = () => {
  const [showPoints, setShowPoints] = useState(false);
  const [showBuildings, setShowBuildings] = useState(false);
  const [showKML1, setshowKML1] = useState(false);
  const [showKML2, setshowKML2] = useState(false);
  const points = [
    {
      lat: 137.96889541,
      long: -3.70455916,
    },
    {
      lat: 137.98929621,
      long: -3.72710416,
    },
    {
      lat: 137.96769999,
      long: -3.73705542,
    },
    {
      lat: 137.97085574,
      long: -3.71154126,
    },
  ];

  const buildings = [
    {
      lat: 137.96282225,
      long: -3.71896487,
    },
    {
      lat: 138.08469435,
      long: -3.68404432,
    },
    {
      lat: 138.10768344,
      long: -3.71908523,
    },
    {
      lat: 138.10779001,
      long: -3.74408637,
    },
  ];
  return (
    <div style={{ display: 'flex', flexDirection: 'row' }}>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          zIndex: '100',
          backgroundColor: 'white',
          width: '10%',
          height: '5%',
          borderRadius: '10px',
          marginTop: '20px',
          marginLeft: '20px',
          padding: '10px',
        }}
      >
        <label for="points">
          <input
            id="points"
            type="checkbox"
            onClick={() => setShowPoints((prev) => !prev)}
          />
          BTS
        </label>
        <label for="buildings">
          <input
            id="buildings"
            type="checkbox"
            onClick={() => setShowBuildings((prev) => !prev)}
          />
          Buildings
        </label>
        <label for="kml1">
          <input
            id="kml1"
            type="checkbox"
            onClick={() => setshowKML1((prev) => !prev)}
          />
          KML 1
        </label>
        <label for="kml2">
          <input
            id="kml2"
            type="checkbox"
            onClick={() => setshowKML2((prev) => !prev)}
          />
          KML 2
        </label>
      </div>
      <Viewer full>
        {showPoints &&
          points.map((e, id) => {
            return (
              <>
                <CameraFlyToBoundingSphere
                  boundingSphere={
                    new BoundingSphere(
                      Cartesian3.fromDegrees(137.96889541, -3.70455916, 200),
                      200
                    )
                  }
                  offset={
                    new HeadingPitchRange(0, CesiumMath.toRadians(-30), 80000)
                  }
                  duration={3}
                />
                <Entity
                  name={`BTS ${id}`}
                  position={Cartesian3.fromDegrees(e.lat, e.long, 200)}
                >
                  {/* <PointGraphics pixelSize={100} color={Color.YELLOW} /> */}
                  {/* <EntityDescription>
            <h1>Hello world</h1>
            <p>test</p>
          </EntityDescription> */}
                  <BillboardGraphics
                    image={signalIcon}
                    height={30}
                    width={30}
                  />
                </Entity>
              </>
            );
          })}
        {showBuildings &&
          buildings.map((e, id) => {
            return (
              <>
                <CameraFlyToBoundingSphere
                  boundingSphere={
                    new BoundingSphere(
                      Cartesian3.fromDegrees(137.96889541, -3.70455916, 200),
                      200
                    )
                  }
                  offset={
                    new HeadingPitchRange(0, CesiumMath.toRadians(-30), 80000)
                  }
                  duration={3}
                />
                <Entity
                  name={`Building ${id}`}
                  position={Cartesian3.fromDegrees(e.lat, e.long, 200)}
                >
                  {/* <PointGraphics pixelSize={100} color={Color.YELLOW} /> */}
                  {/* <EntityDescription>
            <h1>Hello world</h1>
            <p>test</p>
          </EntityDescription> */}
                  <BillboardGraphics
                    image={buildingIcon}
                    height={30}
                    width={30}
                  />
                </Entity>
              </>
            );
          })}
        {showKML1 ? (
          <>
            <CameraFlyToBoundingSphere
              boundingSphere={
                new BoundingSphere(
                  Cartesian3.fromDegrees(137.96889541, -3.70455916, 200),
                  200
                )
              }
              offset={
                new HeadingPitchRange(0, CesiumMath.toRadians(-30), 80000)
              }
              duration={3}
            />
            <KmlDataSource
              data={
                'https://cesium.naufalibnusalam.com/kml/UNet_Generated_MUL053MM1_PUNCAKMULIA.kmz'
              }
              onLoad={(dataSource) => {
                // you can modify data source here
                dataSource.entities.values.forEach((e) => {
                  e.label = undefined;
                });
              }}
            />
          </>
        ) : (
          <></>
        )}
        {showKML2 && (
          <>
            <CameraFlyToBoundingSphere
              boundingSphere={
                new BoundingSphere(
                  Cartesian3.fromDegrees(129.8267762956, -1.82964037, 200),
                  200
                )
              }
              offset={
                new HeadingPitchRange(0, CesiumMath.toRadians(-30), 80000)
              }
              duration={3}
            />
            <KmlDataSource
              data={
                'https://cesium.naufalibnusalam.com/kml/MAPS_WAIGAMA_BARAT.kmz'
              }
              // data={'../kml/UNet_Generated_MUL053MM1_PUNCAKMULIA.kmz'}
              onLoad={(dataSource) => {
                // you can modify data source here
                dataSource.entities.values.forEach((e) => {
                  e.label = undefined;
                });
              }}
            />
          </>
        )}
      </Viewer>
    </div>
  );
};

export default Resium;
