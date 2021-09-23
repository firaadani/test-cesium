import React from "react";
import {
  Cartesian3,
  ArcGisMapServerImageryProvider,
  Math as CesiumMath,
} from "cesium";
import {
  KmlDataSource,
  Viewer,
  Entity,
  ImageryLayer,
  Camera,
  CameraFlyTo,
} from "cesium-react";

function App() {
  return (
    <Viewer full>
      <KmlDataSource
        // data={"./kml/KML_Samples.kml"}
        // data={"./kml/UNet_Generated_MUL053MM1_PUNCAKMULIA.kmz"}
        url={
          "https://naufalibnusalam.com/kml/UNet_Generated_MUL053MM1_PUNCAKMULIA.kmz"
        }
        // url={"https://naufalibnusalam.com/kml/slg0070My%20Places.kml"}
        onError={(err) => console.log(err)}
        onLoad={(data) => console.log(data)}
        show
        clustering
        name="test"
      />
      <Entity
        name="tokyo"
        position={Cartesian3.fromDegrees(139.767052, 35.681167, 100)}
        point={{ pixelSize: 10 }}
      >
        test
      </Entity>
      {/* <ImageryLayer
        imageryProvider={
          new ArcGisMapServerImageryProvider({
            url: "//services.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer",
          })
        }
      /> */}
      {/* camera will be moved instantly. */}
      {/* you can use for initializing camera position. */}
      {/* <Camera
        view={{
          destination: Cartesian3.fromDegrees(
            -122.0839597145766,
            37.42222904525232,
            2000
          ),
          // orientation: { pitch: CesiumMath.toRadian(-60) },
        }}
      /> */}

      {/* camera animation */}
      {/* <CameraFlyTo
        destination={Cartesian3.fromDegrees(
          -122.0839597145766,
          37.42222904525232,
          500
        )}
        // orientation={{ pitch: CesiumMath.toRadian(-60) }}
        duration={3}
      /> */}
    </Viewer>
  );
}

export default App;

// 3.4233 137.5835
