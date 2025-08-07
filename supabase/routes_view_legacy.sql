create view public.routes as
select
  r.code,
  min(ca.name) as name_ca,
  min(ca.description) as description_ca,
  min(ca.departure) as departure_ca,
  min(ca.arrival) as arrival_ca,
  min(z.name) as zone,
  r.grade,
  r.vdrop as elevation,
  r.orientation,
  r.circular,
  r.duration,
  round(
    sum(st_length (t.geometry::geography)) filter (
      where
        t.main = true
    )
  ) as distance,
  LEAST(
    r.created_at,
    min(t.created_at)::timestamp with time zone
  ) as created_at,
  GREATEST(
    r.updated_at,
    max(t.updated_at)::timestamp with time zone
  ) as updated_at,
  json_agg(t.*) as trails
from
  private.routes r
  join private.trails t on r.code::text = t.route_code::text
  join private.routes_i18n_ca ca on r.code::text = ca.route_code::text
  join private.zones z on r.zone_code::text = z.code::text
group by
  r.code;
