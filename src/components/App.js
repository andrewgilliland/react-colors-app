import React, { useEffect, useState } from "react";
import { Route, Switch } from "react-router-dom";
import { TransitionGroup, CSSTransition } from "react-transition-group";

import Palette from "./Palette";
import PaletteList from "./PaletteList";
import SingleColorPalette from "./SingleColorPalette";
import Page from "./Page";

import seedColors from "../utils/seedColors";
import NewPaletteForm from "./NewPaletteForm";
import { generatePalette } from "../utils/colorHelpers";

function App() {
  const [palettes, setPalettes] = useState(() => {
    try {
      const savedPalettes = JSON.parse(window.localStorage.getItem("palettes"));
      return savedPalettes || seedColors;
    } catch (error) {
      return seedColors;
    }
  });

  useEffect(() => {
    window.localStorage.setItem("palettes", JSON.stringify(palettes));
  }, [palettes]);

  const findPalette = (id) => palettes.find((palette) => palette.id === id);

  const deletePalette = (id) => {
    setPalettes((st) => st.filter((palette) => palette.id !== id));
  };

  const savePalette = (newPalette) => {
    setPalettes((st) => [...st, newPalette]);
  };

  return (
    <Route
      render={({ location }) => (
        <TransitionGroup>
          <CSSTransition key={location.key} classNames="page" timeout={500}>
            <Switch location={location}>
              <Route
                exact
                path="/palette/new"
                render={(routeProps) => (
                  <Page>
                    <NewPaletteForm
                      savePalette={savePalette}
                      palettes={palettes}
                      {...routeProps}
                    />
                  </Page>
                )}
              />

              <Route
                exact
                path="/palette/:paletteId/:colorId"
                render={(routeProps) => (
                  <Page>
                    <SingleColorPalette
                      colorId={routeProps.match.params.colorId}
                      palette={generatePalette(
                        findPalette(routeProps.match.params.paletteId),
                      )}
                    />
                  </Page>
                )}
              />

              <Route
                exact
                path="/"
                render={(routeProps) => (
                  <Page>
                    <PaletteList
                      palettes={palettes}
                      deletePalette={deletePalette}
                      {...routeProps}
                    />
                  </Page>
                )}
              />

              <Route
                exact
                path="/palette/:id"
                render={(routeProps) => (
                  <Page>
                    <Palette
                      palette={generatePalette(
                        findPalette(routeProps.match.params.id),
                      )}
                    />
                  </Page>
                )}
              />

              <Route
                render={(routeProps) => (
                  <Page>
                    <NewPaletteForm
                      savePalette={savePalette}
                      palettes={palettes}
                      {...routeProps}
                    />
                  </Page>
                )}
              />
            </Switch>
          </CSSTransition>
        </TransitionGroup>
      )}
    />
  );
}

export default App;
