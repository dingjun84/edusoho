<?php
namespace Topxia\Common;

class CurlToolkit
{
	public static function request($method, $url, $params = array(), $conditions = array())
    {
        $conditions['userAgent'] = isset($conditions['userAgent']) ? $conditions['userAgent'] : '';
        $conditions['connectTimeout'] = isset($conditions['connectTimeout']) ? $conditions['connectTimeout']:10;
        $conditions['timeout'] = isset($conditions['timeout']) ? $conditions['timeout']:10;

        $curl = curl_init();

        curl_setopt($curl, CURLOPT_SSL_VERIFYPEER, FALSE);
        curl_setopt($curl, CURLOPT_USERAGENT, $conditions['userAgent']);
        curl_setopt($curl, CURLOPT_CONNECTTIMEOUT, $conditions['connectTimeout']);
        curl_setopt($curl, CURLOPT_TIMEOUT, $conditions['timeout']);
        curl_setopt($curl, CURLOPT_RETURNTRANSFER, 1);
        curl_setopt($curl, CURLOPT_HEADER, 0);

        if ($method == 'POST') {
            curl_setopt($curl, CURLOPT_POST, 1);
            //TODO 
            curl_setopt($curl, CURLOPT_POSTFIELDS, json_encode($params));
        } else if ($method == 'PUT') {
            curl_setopt($curl, CURLOPT_CUSTOMREQUEST, 'PUT');
            curl_setopt($curl, CURLOPT_POSTFIELDS, json_encode($params));
        } else if ($method == 'DELETE') {
            curl_setopt($curl, CURLOPT_CUSTOMREQUEST, 'DELETE');
            curl_setopt($curl, CURLOPT_POSTFIELDS, json_encode($params));
        } else if ($method == 'PATCH') {
            curl_setopt($curl, CURLOPT_CUSTOMREQUEST, 'PATCH');
            curl_setopt($curl, CURLOPT_POSTFIELDS, json_encode($params));
        } else {
            if (!empty($params)) {
                $url = $url . (strpos($url, '?') ? '&' : '?') . http_build_query($params);
            }
        }

        curl_setopt($curl, CURLOPT_URL, $url );
        curl_setopt($curl, CURLINFO_HEADER_OUT, TRUE );

        $response = curl_exec($curl);

        curl_close($curl);

        $response = json_decode($response, true);
        return $response;
    }

}