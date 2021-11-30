import React, { useState } from 'react';
import {
  Cartesian3,
  Math as CesiumMath,
  BoundingSphere,
  HeadingPitchRange,
  Typography,
} from 'cesium';
import {
  CameraFlyToBoundingSphere,
  Entity,
  BillboardGraphics,
  EntityDescription,
} from 'resium';

import signalIcon from '../assets/antenna.svg';
import buildingIcon from '../assets/building.svg';
import destinationIcon from '../assets/destination.svg';

const EntityBuilder = ({ lat, long, icon, name, img }) => {
  const [count, setCount] = useState(0);
  console.log(long, lat);
  return (
    <>
      <CameraFlyToBoundingSphere
        boundingSphere={
          new BoundingSphere(Cartesian3.fromDegrees(long, lat, 200), 200)
        }
        offset={new HeadingPitchRange(0, CesiumMath.toRadians(-30), 80000)}
        duration={3}
      />
      <Entity
        name={`${name}`}
        position={Cartesian3.fromDegrees(long, lat, 200)}
        point={{ pixelSize: 15 }}
        description={name}
      >
        >{/* <PointGraphics pixelSize={100} color={Color.YELLOW} /> */}
        {/* <EntityDescription>
        <h1>Hello world</h1>
        <p>test</p>
      </EntityDescription> */}
        <EntityDescription>
          <img src={img} alt={name} style={{ width: '100%' }} />
        </EntityDescription>
        {icon === 'signalIcon' && (
          <>
            <BillboardGraphics image={signalIcon} height={30} width={30} />
          </>
        )}
        {icon === 'building' && (
          <BillboardGraphics image={buildingIcon} height={30} width={30} />
        )}
        {icon === 'situs' && (
          <BillboardGraphics image={destinationIcon} height={30} width={30} />
        )}
      </Entity>
    </>
  );
};

export default EntityBuilder;
