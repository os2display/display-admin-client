import { React } from "react";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";
import { Button, Card, Row } from "react-bootstrap";
import Col from "react-bootstrap/Col";
import PosterSingle from "./poster-single";
import PosterSubscription from "./poster-subscription";

/**
 * @param {object} props Props.
 * @param {object} props.feedSource Feed source.
 * @param {Function} props.getValueFromConfiguration Gets a value from the feed
 *   configuration.
 * @param {Function} props.configurationChange Configuration onChange.
 * @param {object} props.configuration Configuration.
 * @returns {object} PosterSelector component.
 */
function PosterSelectorV2({
  feedSource,
  getValueFromConfiguration,
  configuration,
  configurationChange,
}) {
  const { t } = useTranslation("common", { keyPrefix: "poster-selector-v2" });
  const posterType = getValueFromConfiguration("posterType");

  return (
    <Card className="mb-3">
      <Card.Body>
        {!posterType && (
          <Row>
            <Col>
              <h5>{t("select-mode")}</h5>
            </Col>
            <Col>
              <Button
                onClick={() =>
                  configurationChange({
                    target: {
                      id: "posterType",
                      value: "single",
                    },
                  })
                }
              >
                {t("poster-feed-type-single")}
              </Button>
            </Col>
            <Col>
              <Button
                onClick={() =>
                  configurationChange({
                    target: {
                      id: "posterType",
                      value: "subscription",
                    },
                  })
                }
              >
                {t("poster-feed-type-subscription")}
              </Button>
            </Col>
          </Row>
        )}
        {posterType && (
          <>
            {posterType === "single" && (
              <PosterSingle
                feedSource={feedSource}
                configuration={configuration}
                getValueFromConfiguration={getValueFromConfiguration}
                configurationChange={configurationChange}
              />
            )}
            {posterType === "subscription" && (
              <PosterSubscription
                feedSource={feedSource}
                configuration={configuration}
                getValueFromConfiguration={getValueFromConfiguration}
                configurationChange={configurationChange}
              />
            )}
          </>
        )}
      </Card.Body>
    </Card>
  );
}

PosterSelectorV2.propTypes = {
  getValueFromConfiguration: PropTypes.func.isRequired,
  configurationChange: PropTypes.func.isRequired,
  configuration: PropTypes.shape({}),
  feedSource: PropTypes.shape({
    admin: PropTypes.arrayOf(
      PropTypes.shape({
        endpointEntity: PropTypes.string,
        endpointSearch: PropTypes.string,
      })
    ),
  }).isRequired,
};

export default PosterSelectorV2;
